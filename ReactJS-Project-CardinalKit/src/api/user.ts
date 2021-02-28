import { Survey } from './survey';

export interface UserDetails {
  ID: string;
  eID: string;
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  surveyList?: Survey[];
  lastActive: number;
  medications: string;
}
