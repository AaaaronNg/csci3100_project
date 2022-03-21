import * as actions from "./index"
import axios from "axios"

import { getAuthHeader, removeTokenCookie, getTokenCookie } from "../../utils/tools"

axios.defaults.headers.post["Content-Type"] = "application/json"


export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const users = await axios.get("/api/users/userList")
            dispatch(actions.getAllUsers(users.data))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const updatePW = ({ password, id }) => {
    return async (dispatch) => {
        try {
            await axios.patch("/api/auth/updatePW", {
                id: id,
                password: password
            }, getAuthHeader())
            dispatch(actions.success("Password is updated"))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const userRegister = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post("/api/auth/register", {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password
            })
            console.log(user)
            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.success("welcom !! Please check your mail"))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const userLogin = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post("/api/auth/signin", {
                email: values.email,
                password: values.password
            })
            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.success("welcome !!!"))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}


export const userIsAuth = () => {
    return async (dispatch) => {
        try {
            if (!getTokenCookie()) {
                throw new Error()
            }

            const user = await axios.get("/api/auth/isauth", getAuthHeader())

            dispatch(actions.userAuthenticate({
                data: user.data,
                auth: true
            }))

        } catch (error) {
            dispatch(actions.userAuthenticate({ data: {}, auth: false }))
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        try {
            if (!getTokenCookie()) {
                throw new Error()
            }
            removeTokenCookie()
            dispatch(actions.success("Log Out Successfully"))
            dispatch(actions.emptyUser())

        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}


export const userUpdateProfile = (data) => {
    return async (dispatch, getState) => {

        try {
            console.log(data)
            const profile = await axios.patch("/api/users/profile", {
                firstname: data.firstname,
                lastname: data.lastname,
            }, getAuthHeader())

            console.log(data.email)

            const newEmail = await axios.patch("/api/users/email", {
                newemail: data.email,
            }, getAuthHeader())

            const userData = {
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname,
            }



            dispatch(actions.updateUserProfile(userData))
            dispatch(actions.updateUserEmail(newEmail.data.user.email))
            dispatch(actions.success("Profile Updated !!"))


        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}


export const userAddToCart = (item, currentUser) => {
    return async (dispatch) => {
        try {
            //console.log(currentUser)
            const cart = await axios.patch("/api/users/updateCart", {
                product: item,
                currentUser: currentUser.data
            }, getAuthHeader())

            dispatch(actions.userAddToCart(
                cart.data.cart
            ))
            dispatch(actions.success(`${item.name} add to cart !`))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const removeFromCart = (item) => {
    return async (dispatch) => {
        try {

            const cart = await axios.patch("/api/users/removeFromCart", {
                id: item._id
            }, getAuthHeader())

            dispatch(actions.userAddToCart(
                cart.data.cart
            ))

            dispatch(actions.success(`${item.name} remove to cart !`))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const userPurchaseSuccess = (orderId) => {
    return async (dispatch) => {
        try {
            const user = await axios.post("/api/transaction", { orderId }, getAuthHeader())
            dispatch(actions.success("Thank you for your purchase"))
            dispatch(actions.userPurchaseSuccess(user.data))


        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }
}

export const addProfilePic = (profilePicUrl) => {
    return async (dispatch) => {
        try {

            await axios.patch("/api/users/rmoveProfilePic", { userId: profilePicUrl.userId }, getAuthHeader())
            const user = await axios.patch("/api/users/addProfilePic",
                { userId: profilePicUrl.userId, url: profilePicUrl.url },
                getAuthHeader()
            )
            dispatch(actions.success("Your profile picture is updated"))
            console.log(user.data)
            dispatch(actions.updateUserProfile(user.data))
        } catch (error) {
            dispatch(actions.error(error.response.data.message))
        }
    }

}