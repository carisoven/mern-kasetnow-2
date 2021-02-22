import {combineReducers} from 'redux'
import auth from './auth'
import shop from './shop'
// import alert from './alert';
import products from './products';

export default combineReducers({
    auth,
    shop,
    products
})