import { createSelector } from 'reselect';

import { Store } from '../reducers/rootReducer';

import { Survey } from '../api/survey';

const selectSurveysDomain = (state: Store) => state.surveys;

export const selectSurveys = (state: Store, props: { userID: number }): Survey[] => {
  const surveys = selectSurveysDomain(state).surveys.get(props.userID);
  return surveys ? surveys : [];
};

export const selectSortedSurveys = createSelector(
  [selectSurveys],
  (surveys: Survey[]) =>
    [...surveys]
      .sort(
        (survey1: Survey, survey2: Survey): number =>
          survey1.createdAt.getTime() - survey2.createdAt.getTime()
      )
      .reverse()
);
