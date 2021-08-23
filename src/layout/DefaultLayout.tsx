import React, { PropsWithChildren } from 'react';

interface Props {
  theme: string
}

export const DefaultLayout = ({ children }: PropsWithChildren<Props>) => (
  <>
    {children}
  </>
);
