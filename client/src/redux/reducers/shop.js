/* eslint-disable import/no-anonymous-default-export */
import {
  MYSHOP_LOAD,
  MYSHOPLOAD_FAIL,
  ADDSHOP,
  ADDSHOP_FAIL,
  CLEAE_SHOPALL
} from "../action/types";

const initialState = {
  myshop: null,
  shops: null,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MYSHOP_LOAD:
      return {
        ...state,
        myshop: payload,
        loading: false,
      };
    case MYSHOPLOAD_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        myshop: null,
        shops: null,
      };
    case ADDSHOP:
      return {
        ...state,
        shops:payload
      }
    case ADDSHOP_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        myshop: null,
        shops: null,
      };

      case CLEAE_SHOPALL:
        return{
          ...state,
          myshop: null,
          shops: null,
          loading: false,
          error: {},
        }
    default:
      return state;
  }
}
