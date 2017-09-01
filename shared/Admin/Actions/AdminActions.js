export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL'


export function login(user) {
    if (user.hasAccess) {
        sessionStorage.setItem('isAdmin', true);
        return (dispatch) => {
            dispatch(loginSucess(user))
        }
    }
    else {
        return (dispatch) => {
            dispatch(loginFail())
        }
    }

}

export function loginSucess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    }

}

export function loginFail() {
    return {
        type: LOGIN_FAIL
    }

}