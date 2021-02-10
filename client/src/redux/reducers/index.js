import {combineReducers} from 'redux'
import auth from './auth'
import shop from './shop'
// import alert from './alert';
// import user from './user';
export default combineReducers({
    auth,
    shop,
    // user
})