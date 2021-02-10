import axios from 'axios'
import {
    MYSHOP_LOAD,
    MYSHOPLOAD_FAIL,
    ADDSHOP,
    ADDSHOP_FAIL
} from './types';


export const loadShop = () => async dispatch => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.token
        }
      };
      const res = await axios.get("/api/shop/shopload",config);

      dispatch({
        type: MYSHOP_LOAD,
        payload: res.data
      });
    } catch (err) {
        dispatch({
            type: MYSHOPLOAD_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
  };

  export const addshopuser = (formaddshop,history)=>async dispatch =>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': localStorage.token
        }
      };

      const res = await axios.post("/api/shop/addshop", formaddshop, config);
      dispatch({
        type: ADDSHOP,
        payload: res.data
      });
      history.push("/myshop");
      
    } catch (err) {
      dispatch({
        type: ADDSHOP_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }