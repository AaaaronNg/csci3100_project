import {
    GET_ALL_SNACKTYPES,
    GET_SNACKTYPE_BY_ID
} from "../types"



export default function snackTypesReducer(state = {}, action) {

    switch (action.type) {

        case GET_ALL_SNACKTYPES:
            return { ...state, allSnackTypes: action.payload }
        case GET_SNACKTYPE_BY_ID:
            return { ...state, snackTypeById: action.payload }
        default:
            return state
    }
}