
import * as types from "../types"

export default function productsReducer(state = {}, action) {
    switch (action.type) {
        case types.GET_PROD_BY_DATE:
            return { ...state, byDate: action.payload }
        case types.GET_PRODUCT_PAGINATE:
            return { ...state, byPaginate: action.payload }
        case types.REMOVE_PRODUCT:
            return { ...state, removeItem: true }
        case types.ADD_PRODUCT:
            return { ...state, productAdded: action.payload }
        default:
            return state
    }
}