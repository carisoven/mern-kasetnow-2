import axios from 'axios'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  LOADER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_USER,
  LOGOUT,
  CLEAE_SHOPALL
} from './types';

import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get("/api/users");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOADER_FAIL
      });
    }
  };

export const signup = (userData)=> async dispatch =>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
        const res = await axios.post("/api/users/signup",userData,config);
  
        dispatch({
          type:SIGNUP_SUCCESS,
          payload:res.data
        })
        dispatch(loadUser());

    } catch (err) {
      // const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      // }
  
      dispatch({
        type: SIGNUP_FAIL
      });
    }
  };

  export const signin = (formData) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    // const body = JSON.stringify({ username, password });
  
    try {
      const res = await axios.post("/api/users/signin", formData, config);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });    
      
      dispatch(loadUser());
  
    } catch (err) {
      // const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      // }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
  
  export const signout = () => dispatch => {
    dispatch({ type: CLEAR_USER });
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAE_SHOPALL});
  };