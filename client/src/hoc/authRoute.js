import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const AuthRoute = (props) => {
    const users = useSelector(state => state.users)
    const navigate = useNavigate()

    useEffect(() => {
        if (users.auth) {
            navigate("/dashboard/user_info")
        }
    }, [users, navigate])
    return <>
        {props.children}
    </>



}

export default AuthRoute