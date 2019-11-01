import * as React from 'react';
import { ReactNode } from 'react';

import { Card } from './Card';

interface CardTablePropTypes {
  className?: string;
  children: ReactNode;
}

export const CardTable: React.StatelessComponent<CardTablePropTypes> = (
  props: CardTablePropTypes
) => (
  <Card className={`${props.className ? props.className : ''} flex flex-col p-2`}>
    {props.children}
  </Card>
);

interface CardTableRowPropTypes {
  className?: string;
  children?: ReactNode;
  isLast?: boolean;
}

export const CardTableRow: React.StatelessComponent<CardTableRowPropTypes> = (
  props: CardTableRowPropTypes
) => (
  <div
    className={`${
      props.className ? props.className : ''
    } flex justify-between items-center border-solid border-grey ${
      props.isLast ? '' : 'border-b'
    } py-3 mx-1`}
  >
    {props.children}
  </div>
);

interface CardTableColPropTypes {
  className?: string;
  widthPercent: number;
  children?: ReactNode;
}

export const CardTableCol: React.StatelessComponent<CardTableColPropTypes> = (
  props: CardTableColPropTypes
) => (
  <div
    className={`${
      props.className ? props.className : ''
    } flex-no-grow flex justify-center items-center`}
    style={{ width: `${props.widthPercent}%` }}
  >
    {props.children}
  </div>
);

interface CardTableHeaderPropTypes {
  className?: string;
  children?: ReactNode;
}

export const CardTableHeader: React.StatelessComponent<CardTableHeaderPropTypes> = (
  props: CardTableHeaderPropTypes
) => (
  <CardTableRow
    className={`${
      props.className ? props.className : ''
    } text-center font-semibold text-grey-darkest`}
  >
    {props.children}
  </CardTableRow>
);

interface CardTableTitlePropTypes {
  className?: string;
  children?: ReactNode;
}

export const CardTableTitle: React.StatelessComponent<CardTableTitlePropTypes> = (
  props: CardTableTitlePropTypes
) => (
  <div
    className={`${
      props.className ? props.className : ''
    } relative flex justify-center items-center py-2 mx-1 text-2xl font-bold`}
  >
    {props.children}
  </div>
);
