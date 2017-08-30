import axios from 'axios'
import { History } from 'react-router'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login(data) {
    return (dispatch) => {
        dispatch(loginRequest());
        axios.post('/api/admin/isAdmin', data)
            .then((res) => {
                  if(res.data.status){
                      sessionStorage.setItem('isAdmin', true);
                      dispatch(loginSuccess());
                      window.location.href = '/admin'
                      return
                  }
                  dispatch(loginFail())

            })

            .catch((err) => dispatch(loginFail()))
    }
}

export function loginRequest() {
    return{
        type: LOGIN_REQUEST
    }

}
export function loginSuccess() {
    return{
        type: LOGIN_SUCCESS
    }
}
export function loginFail() {
    return{
        type: LOGIN_FAIL
    }

}
