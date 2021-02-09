interface SurveyPayload {
  identifier: string;
  taskRunUUID: string;
  createdAt?: Date;
  startDate: Date;
  endDate: Date;
}

export interface Survey {
  payload: SurveyPayload;
  userID: string;
}
