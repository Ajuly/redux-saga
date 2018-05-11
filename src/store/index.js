import reducer from './reducers';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import rootSaga from '../sagas';

const history = createHistory();
const router = routerMiddleware(history);

let sagaMiddelware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = composeEnhancers(applyMiddleware(sagaMiddelware, router))(createStore)(reducer);

// sagaMiddelware.run(rootSaga, {
//     subscribe: store.subscribe,
//     dispatch: store.dispatch,
//     getState: store.getState
// });

sagaMiddelware.run(rootSaga, store);

window.store = store;

export default store;