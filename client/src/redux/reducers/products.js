    /* eslint-disable import/no-anonymous-default-export */
    import {
    PRODUCTS_ALL,
    PRODUCTSALL_FAIL,
    PRODUCT_LOAD,
    PRODUCTLOAD_FAIL,
    PRODUCTSHOP_LOAD,
    PRODUCTSHOP_FAIL
    } from "../action/types";

    const initialState = {
    products: null,
    productshop:null,
    product: null,
    loading: true,
    error: {},
    };

    export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        
        case PRODUCTSHOP_LOAD:
        return {
            ...state,
            productshop: payload,
            loading: false,
        };
        case PRODUCTSHOP_FAIL:
            return {
                ...state,
                productshop: null,
                loading: false,
            };

        default:
        return state;
    }
    }
