import * as React from 'react';
import { ReactNode } from 'react';

export enum BubbleColor {
  Red = 1,
  Orange,
  Green,
  Teal,
  Blue,
  Indigo,
  Purple,
  Pink
}

const colorToClasses = (color: BubbleColor) => {
  switch (color) {
    case BubbleColor.Green:
      return 'bg-green-lightest text-green-dark border border-green-light';
    case BubbleColor.Orange:
      return 'bg-orange-lightest text-orange-dark border border-orange-light';
    case BubbleColor.Red:
      return 'bg-red-lightest text-red-dark border border-red-light';
    case BubbleColor.Teal:
      return 'bg-teal-lightest text-teal-darker border border-teal-light';
    case BubbleColor.Blue:
      return 'bg-blue-lightest text-blue-dark border border-blue-light';
    case BubbleColor.Indigo:
      return 'bg-indigo-lightest text-indigo-dark border border-indigo-light';
    case BubbleColor.Purple:
      return 'bg-purple-lightest text-purple-dark border border-purple-light';
    case BubbleColor.Pink:
      return 'bg-pink-lightest text-pink-dark border border-pink-light';
    default:
      return '';
  }
};

interface InfoBubblePropTypes {
  className?: string;
  children: ReactNode;
  color: BubbleColor;
}

export const InfoBubble: React.StatelessComponent<InfoBubblePropTypes> = (
  props: InfoBubblePropTypes
) => (
  <div
    className={`${props.className ? props.className : ''} px-2 py-1 my-1 rounded ${colorToClasses(
      props.color
    )}`}
  >
    {props.children}
  </div>
);
