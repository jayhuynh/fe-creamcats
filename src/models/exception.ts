// eslint-disable-next-line max-classes-per-file
import { AxiosError } from 'axios';

type ExceptionType = 'UNKNOWN' | 'AUTH' | 'SERVER_FAILURE' | 'BAD_REQUEST';

export interface SerializedException {
  message: string;
  type: string;
}

abstract class BaseException extends Error {
  constructor(public message: string, public type: ExceptionType) {
    super(message);
  }

  isInstanceOf(ex: ExceptionClasses) {
    return ex.isInstanceOf(this);
  }

  toJson(): SerializedException {
    return {
      message: this.message,
      type: this.type,
    };
  }
}

// add similar class for different type of Exception
export class UnknownException extends BaseException {
  private static TYPE: ExceptionType = 'UNKNOWN';

  private constructor(public message: string, public type = UnknownException.TYPE) {
    super(message, type);
  }

  static isInstanceOf(error: any): error is UnknownException {
    return error?.type === UnknownException.TYPE;
  }

  // use pointed functor instead of constructor to create instance
  // because we don't want the type property is changed by mistake
  static of(message: string) {
    return new UnknownException(message);
  }
}

export class AuthException extends BaseException {
  private static TYPE: ExceptionType = 'AUTH';

  private constructor(public message: string, public type = AuthException.TYPE) {
    super(message, type);
  }

  static isInstanceOf(error: any): error is AuthException {
    return error?.type === AuthException.TYPE;
  }

  static of(message: string) {
    return new AuthException(message);
  }
}

export class ServerFailureException extends BaseException {
  private static TYPE: ExceptionType = 'SERVER_FAILURE';

  private constructor(public message: string, public type = ServerFailureException.TYPE) {
    super(message, type);
  }

  static isInstanceOf(error: any): error is ServerFailureException {
    return error?.type === ServerFailureException.TYPE;
  }

  static of(message: string) {
    return new ServerFailureException(message);
  }
}

export class BadRequestException extends BaseException {
  private static TYPE: ExceptionType = 'BAD_REQUEST';

  private constructor(public message: string, public type = BadRequestException.TYPE) {
    super(message, type);
  }

  static isInstanceOf(error: any): error is BadRequestException {
    return error?.type === BadRequestException.TYPE;
  }

  static of(message: string) {
    return new BadRequestException(message);
  }
}

// Exception factory which centralized all mapping logic from backend to frontend error.
// Should be updated correspondingly with Error from backend
export const exceptionOf = (error: Error | AxiosError) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError;
  }

  if (isAxiosError(error)) {
    if (error.response && [401, 403].includes(error.response.status)) {
      // used message from error.message
      // or mapping to front-end error code ex: error.unauthorized
      return AuthException.of(error.message);
    }

    if (error.response?.status === 400) {
      return BadRequestException.of(error.message);
    }
  }
  return UnknownException.of('error.unknown');
};

export type ExceptionClasses = typeof UnknownException
  | typeof AuthException
  | typeof ServerFailureException
  | typeof BadRequestException;

export type Exception = UnknownException
| AuthException
| ServerFailureException
| BadRequestException;
