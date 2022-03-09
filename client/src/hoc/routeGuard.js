import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "../utils/lorder"
import { useNavigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {


    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false)
    const users = useSelector(state => state.users)

    useEffect(() => {

        if (!users.auth) {
            //console.log("hello")
            navigate("/")
        } else {
            setIsAuth(true)
        }
    }, [users, navigate])




    if (!isAuth) {
        return (<Loader />)
    } else {
        return children
    }





}

export default RouteGuard
