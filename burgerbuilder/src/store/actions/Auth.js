import * as actiontypes from './actiontypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actiontypes.AUTH_START
    };
}
export const authSuccess = (token, userId) => {
    return {
        type: actiontypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
}
export const authFail = (error) => {
    return {
        type: actiontypes.AUTH_FAIL,
        error: error
    };
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiratonDate');
    localStorage.removeItem('userId');

    return {
        type: actiontypes.AUTH_LOGOUT
    };
}

export const CheckAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, issignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let uri = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAhvsDnPop_ILhdErDR4Sf80uJmvUtxX5c';
        if (!issignUp) {
            uri = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAhvsDnPop_ILhdErDR4Sf80uJmvUtxX5c';
        }
        axios.post(uri, authData)
            .then(response => {
                console.log(response);
                const expiratonDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expiratonDate', expiratonDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(CheckAuthTimeout(response.data.expiresIn));

            }).catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            }

            )
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actiontypes.SET_AUTH_REDIRECT,
        path: path
    };
}
export const authCheckState = () => {
    return dispatch=> {
        const token =localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expiratonDate=new Date(localStorage.getItem('expirationDate'));
            if(expiratonDate <= new Date()){
            dispatch(logout());
            }
            else{
                const userId= localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(CheckAuthTimeout((expiratonDate.getTime() -new Date().getTime())/1000));

            }
        }
    };
}