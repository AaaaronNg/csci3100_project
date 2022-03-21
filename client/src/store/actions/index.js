
import {
    GET_PROD_BY_DATE,
    ERROR,
    SUCCESS,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    EMPTY_USER,
    UPDATE_USER_PROFILE,
    UPDATE_USER_EMAIL,
    REMOVE_PRODUCT,
    GET_PRODUCT_PAGINATE,
    GET_ALL_SNACKTYPES,
    ADD_PRODUCT,
    GET_SNACKTYPE_BY_ID,
    USER_ADD_TO_CART,
    PURCHASE_SUCCESS,
    GET_ALL_USERS,
    UPDATE_USER_PROFILEPIC
} from "../types"

// product

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
})

export const productsByPaginate = (products) => ({
    type: GET_PRODUCT_PAGINATE,
    payload: products
})

export const productRemove = () => ({
    type: REMOVE_PRODUCT
})

export const productAdd = (product) => ({
    type: ADD_PRODUCT,
    payload: product
})

// user

export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const emptyUser = (msg) => (
    {
        type: EMPTY_USER
    }
)

export const updateUserProfile = (data) => (
    {
        type: UPDATE_USER_PROFILE,
        payload: data
    }
)

export const updateUserEmail = (data) => ({
    type: UPDATE_USER_EMAIL,
    payload: data
}
)

export const userAddToCart = (data) => ({
    type: USER_ADD_TO_CART,
    payload: data
})

export const userPurchaseSuccess = (data) => ({
    type: PURCHASE_SUCCESS,
    payload: data
})

export const getAllUsers = (data) => ({
    type: GET_ALL_USERS,
    payload: data
})

export const updateProfilePIc = (data) => ({
    type: UPDATE_USER_PROFILEPIC,
    payload: data
})


//snackTypes
export const getAllSnackTypes = (snackTypes) => ({
    type: GET_ALL_SNACKTYPES,
    payload: snackTypes
})

export const getSnackTypeById = (snackType) => ({
    type: GET_SNACKTYPE_BY_ID,
    payload: snackType
})

// notification

export const error = (msg) => ({
    type: ERROR,
    payload: msg
})

export const success = (msg) => ({
    type: SUCCESS,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}