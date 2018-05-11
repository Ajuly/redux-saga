import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../sagas';

// 这是一个可以帮你运行saga的中间件
let SagaMiddleware = createSagaMiddleware();
let store = createStore(reducers,applyMiddleware(SagaMiddleware));

// 通过中间件执行或者运行saga
SagaMiddleware.run(rootSaga,store);

window.store = store;

export default store;