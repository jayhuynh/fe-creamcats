export interface BaseModel {
  readonly id: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface DataResponse<T> {
  data: T;
}

export interface PageableResponse<T> extends DataResponse<T[]>{
  total: number;
}
