import { EventType } from './event';

export interface Survey {
  ID: number;
  createdAt: Date;
  syncID: string;
  eventType: EventType;
}
