
import axios from "axios"
import * as actions from "./index"

export const getAllSnackTypes = () => {
    return async (dispatch) => {
        try {
            const snackTypes = await axios.get("/api/snackTypes/all")
            //console.log(snackTypes.data)
            dispatch(actions.getAllSnackTypes(snackTypes.data))

        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const getSnackTypeById = (id) => {
    return async (dispatch) => {
        try {
            const snackType = await axios.get(`/api/snackTypes/snackType/${id}`)
            dispatch(actions.getSnackTypeById(snackType.data))
        } catch (error) {
            dispatch(actions.error("something happen"))
        }
    }
}