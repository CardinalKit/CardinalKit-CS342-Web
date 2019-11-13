import { Survey } from './survey';

export interface UserDetails {
  ID: string;
  eID: string;
  userID: string;
  email: string;
  createdAt?: Date;
  surveyList?: Survey[];
  lastActive: Date;
}
