import axios from 'axios'
import { History } from 'react-router'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';



export function login() {
    sessionStorage.setItem('isAdmin', true);
    return{
        type:LOGIN_SUCCESS
    }
}

