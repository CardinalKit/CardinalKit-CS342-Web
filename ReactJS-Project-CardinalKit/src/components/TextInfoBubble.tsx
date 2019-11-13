import * as React from 'react';

import { BubbleColor, InfoBubble } from '../ui/InfoBubble';

interface BubbleProps {
  label: String;
  color?: BubbleColor;
}

export const TextInfoBubble: React.StatelessComponent<BubbleProps> = (
  props: BubbleProps
) => (
  <InfoBubble color={props.color || BubbleColor.Teal} className="font-semibold">
    <span>{props.label}</span>
  </InfoBubble>
);
