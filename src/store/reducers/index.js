import * as types from '../action-types'
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

let user =  function(state={token:null,error:null},action){
    switch(action.type){
        case types.LOGIN_SUCCESS:
            return {...state,token:action.token};
        case types.LOGIN_ERROR:
            return {...state,error:action.error};
        case types.LOGOUT_SUCCESS:
            return {token:null,error:null};
        case types.LOGOUT_ERROR:
            return state;
        default:
            return state;
    }
}

export default combineReducers({
    user,
    router: routerReducer
})