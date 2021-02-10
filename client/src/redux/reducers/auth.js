/* eslint-disable import/no-anonymous-default-export */
import {    
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    LOADER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_USER,
    LOGOUT
} from '../action/types'

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    admin: false,
    userrole:false,
    loading: false,
    user: null,
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        if(payload.role === "ROLE_ADMIN"){
           return {
          ...state,
          isAuthenticated: true,
          admin: true,
          userrole:false,
          loading: false,
          user: payload
        };
        }
        else if(payload.role === "ROLE_USER"){
          return {
            ...state,
            isAuthenticated: true,
            admin: false,
            userrole: true,
            loading: false,
            user: payload
          };
        }
        break
        
      case LOADER_FAIL:
        return{
          ...state,
          isAuthenticated: false,
          loading: false,
          admin: false,
          userrole:false,
        }
      case SIGNUP_SUCCESS:
          localStorage.setItem("token",payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated:true,
          loading: false
        };
      case SIGNUP_FAIL:
      case LOGIN_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_FAIL:
      case CLEAR_USER:
      case LOGOUT:
        localStorage.removeItem("token",null);
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          admin: null,
          userrole:null,
          user: null
        };
        
      default:
        return state;
    }
  }