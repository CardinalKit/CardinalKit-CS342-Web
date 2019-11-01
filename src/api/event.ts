export enum EventType {
  Walktest = 1,
  MedicalSurvey = 2,
  SurgicalSurvey = 3,
  WalkingSurvey = 4,
  Sf12Survey = 5,
}

export interface Event {
  ID: number;
  createdAt: Date;
  updatedAt: Date;
  eventType: EventType;
  mobileUserID: number;
  scheduled: Date;
  userNotified: boolean;
  remindersSent: number;
}

export interface APIEvent {
  id: number;
  createdAt: string;
  updatedAt: string;
  eventID: number;
  mobileUserID: number;
  scheduled: string;
  userNotified: boolean;
  remindersSent: number;
}

export function apiEventToEvent(apiEvent: APIEvent): Event {
  return {
    ID: apiEvent.id,
    createdAt: new Date(apiEvent.createdAt),
    updatedAt: new Date(apiEvent.updatedAt),
    eventType: apiEvent.eventID as EventType,
    mobileUserID: apiEvent.mobileUserID,
    scheduled: new Date(apiEvent.scheduled),
    userNotified: apiEvent.userNotified,
    remindersSent: apiEvent.remindersSent,
  };
}

export interface NewEvent {
  tempID: number;
  scheduled: Date;
  eventType: EventType;
}

export interface APINewEvent {
  eventID: number;
  scheduled: string;
}

export function newEventToAPIEvent(newEvent: NewEvent): APINewEvent {
  return {
    eventID: newEvent.eventType,
    scheduled: newEvent.scheduled.toISOString(),
  };
}
