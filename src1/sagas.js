import 'babel-polyfill';
import {takeEvery,all,call,put,take} from 'redux-saga/effects';
import * as types from './store/action-types';

// export function* helloSaga(){
//     console.log("hello");
// }

export const delay = ms => new Promise(function(resolve){
    setTimeout(() => {
        resolve();
    }, ms);
})

export function* increment(){
    // 第一种写法：
    // yield setTimeout(() => {
    //     dispatch({type:types.INCREMENT});
    // }, 1000);

    // 第二种写法：
    // yield delay(1000);
    // dispatch({type:types.INCREMENT});
    
    // 第三种写法：
    yield call(delay,1000); // {type:'call',fn:delay,args:1000}
    // dispatch({type:types.INCREMENT});

    yield put({type:types.INCREMENT});

}

export function* watchIncrement(){
    // 用来监听特定的动作
    yield takeEvery(types.INCREMENT_ASYNC,increment);
}

export function* watchIncrement2(){
    for (let i = 0; i < 3; i++) {
        // take监听指定
        let action = yield take(types.INCREMENT_ASYNC);
        yield increment();
    }
}

export function* log(){
    // console.log('老状态',getState());
    // console.log(action);
    // console.log('新状态',getState());
}

export function* watchAndLog(){
    // 用来监听特定的动作
    yield takeEvery('*',log);
}

export function* rootSaga({dispatch,getState}){
    // 用来监听特定的动作
    // yield all([watchIncrement(dispatch),watchAndLog(dispatch,getState)]);
    yield watchIncrement2();
}

