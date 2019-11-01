export interface UserDetails {
  ID: number;
  eID: string;
  userID: string;
  createdAt?: Date;
  internalUser?: boolean;
  lastWalktest?: Date;
  lastActive: Date;
  last6mwt?: Date;
  lastOpenw?: Date;
  lastMedSurvey?: Date;
  lastSurgSurvey?: Date;
  lastWalkSurvey?: Date;
  lastSf12Survey?: Date;
}
