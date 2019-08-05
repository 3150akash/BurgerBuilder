import * as actiontypes from '../actions/actiontypes';
import {updateObject} from '../utility';

let initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
};

const authStart =(state,action)=>{
    return updateObject(state,{
        error:null,
        laoding:true
    })
}
const authLogout =(state,action)=>{
    return updateObject(state,{
        token:null,
        userId:null
    })
}
const setAuthRedirectPath =(state,action)=>{
    return updateObject(state,{
        authRedirectPath:action.path,
    })
}
const authSuccess =(state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false
    });
}
const authFailed =(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}
const reducer=(state =initialState,action) => {
    switch(action.type){
        case actiontypes.AUTH_START:return authStart(state,action);
        case actiontypes.AUTH_SUCCESS:return authSuccess(state,action);
        case actiontypes.AUTH_FAIL:return authFailed(state,action);
        case actiontypes.AUTH_LOGOUT:return authLogout(state,action);
        case actiontypes.SET_AUTH_REDIRECT:return setAuthRedirectPath(state,action);

        default:return state;
    }
}

export default reducer;