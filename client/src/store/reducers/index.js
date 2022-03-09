import { combineReducers } from "redux"
import users from "./users.reducer"
import products from "./products.reducer"
import notifications from "./notification.reducer"
import snackTypes from "./snackTypes.reducer"

const appReducers = combineReducers({
    users,
    products,
    notifications,
    snackTypes
})

export default appReducers