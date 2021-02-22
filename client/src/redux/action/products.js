import axios from "axios";
import {
  PRODUCTS_ALL,
  PRODUCTSALL_FAIL,
  PRODUCT_LOAD,
  PRODUCTLOAD_FAIL,
  PRODUCTSHOP_LOAD,
  PRODUCTSHOP_FAIL,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

export const productsload = (_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    const res = await axios.get(`/api/product/productshop/${_id}`, config);

    dispatch({
      type: PRODUCTSHOP_LOAD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTSHOP_FAIL,
    });
  }
};
