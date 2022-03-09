import axios from "axios"
import * as actions from "./index"

import { getAuthHeader } from "../../utils/tools"

axios.defaults.headers.post["Content-Type"] = "application/json"


export const productsBySort = () => {
    return async (dispatch) => {
        try {
            const products = await axios.get("/api/products/all", {
                limit: 4,
                sortBy: "date",
                order: "desc"
            })

            dispatch(actions.productsByDate(products.data))



        } catch (error) {
            dispatch(actions.error("Sorry something happen, try again"))
        }
    }
}


export const productsByPaginate = (args) => {
    return async (dispatch) => {
        try {
            const products = await axios.post("/api/products/paginate/all", args)
            dispatch(actions.productsByPaginate(products.data))

        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const productRemove = (id) => {
    return async (dispatch) => {
        try {
            console.log(id)
            await axios.delete(`/api/products/product/${id}`, getAuthHeader())

            dispatch(actions.productRemove())
            dispatch(actions.success("product had been removed"))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))

        }
    }
}

export const productAdd = (productData) => {
    return async (dispatch) => {
        try {
            const product = await axios.post("/api/products/", productData, getAuthHeader())
            dispatch(actions.productAdd(product.data))
            dispatch(actions.success("Product had been added"))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

