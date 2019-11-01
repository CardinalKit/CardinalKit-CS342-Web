import { Survey } from '../api/survey';
import { SurveyActionType } from '../constants/surveyConstants';

export type SurveyAction =
  | FetchSurveysAction
  | FetchSurveysSuccessAction
  | FetchSurveysFailureAction;

export interface FetchSurveysAction {
  type: SurveyActionType.FETCH_SURVEYS;
  userID: number;
}

export function fetchSurveys(userID: number): FetchSurveysAction {
  return {
    type: SurveyActionType.FETCH_SURVEYS,
    userID,
  };
}

export interface FetchSurveysSuccessAction {
  type: SurveyActionType.FETCH_SURVEYS_SUCCESS;
  userID: number;
  surveys: Survey[];
}

export function fetchSurveysSuccess(userID: number, surveys: Survey[]): FetchSurveysSuccessAction {
  return {
    type: SurveyActionType.FETCH_SURVEYS_SUCCESS,
    userID,
    surveys,
  };
}

export interface FetchSurveysFailureAction {
  type: SurveyActionType.FETCH_SURVEYS_FAILURE;
  error: Error;
}

export function fetchSurveysFailure(error: Error): FetchSurveysFailureAction {
  return {
    type: SurveyActionType.FETCH_SURVEYS_FAILURE,
    error,
  };
}
