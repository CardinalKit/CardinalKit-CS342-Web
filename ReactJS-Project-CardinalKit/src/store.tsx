import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const devToolsOptions: object = {
  serialize: false,
  trace: true,
};

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(devToolsOptions)((applyMiddleware(
    sagaMiddleware
  ) as unknown) as StoreEnhancer<{}, {}>)
);

sagaMiddleware.run(rootSaga);

export default store;
