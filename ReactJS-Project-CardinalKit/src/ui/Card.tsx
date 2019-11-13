import * as React from 'react';
import { ReactNode } from 'react';

interface CardPropTypes {
  className?: string;
  children: ReactNode;
}

export const Card: React.StatelessComponent<CardPropTypes> = (props: CardPropTypes) => (
  <div
    className={`${props.className ? props.className : ''} w-auto bg-white shadow-md rounded-lg m-4`}
  >
    {props.children}
  </div>
);
