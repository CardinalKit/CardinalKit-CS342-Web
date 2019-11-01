import * as React from 'react';
import { ReactNode } from 'react';

export enum ButtonColor {
  Blue = 0,
  White,
  Green,
  Red,
  RedLight,
}

const colorToClass = (color: ButtonColor, selected: boolean): string => {
  switch (color) {
    case ButtonColor.Blue:
      return `${selected ? 'bg-blue-dark' : 'bg-blue'} hover:bg-blue-dark text-white`;
    case ButtonColor.White:
      return `${selected ? 'bg-grey' : 'bg-grey-lighter'} hover:bg-grey text-black`;
    case ButtonColor.Green:
      return `${selected ? 'bg-green-dark' : 'bg-green'} hover:bg-green-dark text-white`;
    case ButtonColor.Red:
      return `${selected ? 'bg-red-dark' : 'bg-red'} hover:bg-red-dark text-white`;
    case ButtonColor.RedLight:
      return `${
        selected ? 'bg-red-dark text-white' : 'bg-white border-red-dark text-red-dark border'
      } hover:bg-red-dark hover:text-white`;
    default:
      return '';
  }
};

export enum ButtonType {
  Submit = 'submit',
  Reset = 'reset',
  Button = 'button',
}

interface ButtonPropTypes {
  className?: string;
  children: ReactNode;
  type?: ButtonType;
  color: ButtonColor;
  selected?: boolean;
  disablePadding?: boolean;
  onClick?: () => void;
}

export const Button: React.StatelessComponent<ButtonPropTypes> = (props: ButtonPropTypes) => (
  <button
    type={props.type ? props.type : 'button'}
    onClick={props.onClick}
    className={`${props.className ? props.className : ''} ${colorToClass(
      props.color,
      props.selected ? true : false
    )} font-bold ${
      props.disablePadding ? '' : 'py-2 px-4'
    } rounded focus:outline-none focus:shadow-outline flex content-center items-center justify-center`}
  >
    {props.children}
  </button>
);
