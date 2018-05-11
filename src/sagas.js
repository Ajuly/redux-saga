// import 'babel-polyfill'

// import { put , all,take,call,fork,cancel } from 'redux-saga/effects';
// import { push } from 'react-router-redux'

// import * as types from './store/action-types';

// let Api = {
//     login(username,password){
//         return new Promise(function(resolve){
//            setTimeout(function(){
//                resolve('token');
//            },1000);
//         });
//     },
//     logout(){
//         return new Promise(function(resolve){
//             setTimeout(function(){
//                 resolve();
//             },1);
//         });
//     }
// }

// function* login(dispatch,username,password){
//   try{
//       // 如果 Api 调用成功了，login 将发起一个 LOGIN_SUCCESS action 然后返回获取到的 token。 
//       // 如果调用导致了错误，将会发起一个 LOGIN_ERROR action
//       const token = yield call(Api.login,username,password);
//       yield put({type:types.LOGIN_SUCCESS,token});
//       dispatch(push('/logout'));
//   }catch(error){
//       yield put({type:types.LOGIN_ERROR,error});
//   }
// }

// function* logout(dispatch){
//     try{
//         yield call(Api.logout);
//         yield put({type:types.LOGOUT_SUCCESS});
//         dispatch(push('/login'));
//     }catch(error){
//         yield put({type:types.LOGOUT_ERROR,error});
//     }
// }

// function* loginFlow(getState,dispatch){
//     //loginFlow 在一个 while(true) 循环中实现它所有的流程
//     // 这样做的意思是：一旦到达流程最后一步（LOGOUT），通过等待一个新的 LOGIN_REQUEST action 来启动一个新的迭代。
//     while(true){
//         //loginFlow 首先等待一个 LOGIN_REQUEST action。 然后在 action 的 payload 中获取有效凭据（即 user 和 password）并调用一个 call 到 login 任务。
//         //call 不仅可以用来调用返回 Promise 的函数。我们也可以用它来调用其他 Generator 函数
//         //loginFlow 将等待 login 直到它终止或返回
//         //redux-saga 提供了另一个 Effect：fork。 当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。
//         let {username,password} = yield take(types.LOGIN_REQUEST);
//         const task = yield fork(login,dispatch,username,password);
//         yield take(types.LOGOUT_REQUEST);
//         yield cancel(task);
//         yield call(logout,dispatch);
//     }
// }

// function* watchAction(getState){
//     console.log(getState());
// }
// export default function* rootSaga({subscribe,dispatch,getState}){
//     yield all([loginFlow(getState,dispatch),watchAction(getState)]);
// }

import 'babel-polyfill';
import { takeEvery, all, call, put, take } from 'redux-saga/effects';
import * as types from './store/action-types';
import { push } from 'react-router-redux';

let Api = {
  login(username, password) {
    return new Promise(function (resolve, reject) {
      resolve(username + password);
    });
  }
}

function* login(username, password) {
  try {
    let token = yield call(Api.login, username, password);
    yield put({ type: types.LOGIN_SUCCESS, token });
    //跳到个人页
    yield put(push('/logout'));
    return token;
  } catch (error) {
    put({ type: types.LOGIN_ERROR, error });
  }
}

function* loginFlow() {
  while (true) {
    let { username, password } = yield take(types.LOGIN_REQUEST);
    let token = yield login(username, password);
    if (token) {
      yield take(types.LOGOUT_REQUEST);
      //跳回登录
      yield put(push('/login'));
    }
  }
}

function* watchAction(getState) {
  yield takeEvery('*', function* (action) {
    console.log(getState());
    console.log(action);
  });

}
export default function* rootSaga({ getState }) {
  yield all([loginFlow(), watchAction(getState)]);
}