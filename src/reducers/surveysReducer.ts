import { SurveyActionType } from '../constants/surveyConstants';

import { SurveyAction } from '../actions/surveyActions';

import { Survey } from '../api/survey';

export interface SurveyStore
  extends Readonly<{
    loading: boolean;
    surveys: Map<number, Survey[]>;
    error: Error | null;
  }> {}

export const initialSurveyState: SurveyStore = {
  loading: false,
  surveys: new Map<number, Survey[]>(),
  error: null,
};

export function surveysReducer(state = initialSurveyState, action: SurveyAction): SurveyStore {
  switch (action.type) {
    case SurveyActionType.FETCH_SURVEYS:
      return { ...state, loading: true };
    case SurveyActionType.FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        surveys: state.surveys.set(action.userID, action.surveys),
      };
    case SurveyActionType.FETCH_SURVEYS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
