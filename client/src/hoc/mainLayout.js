import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from "../store/actions/index"
import Toast from "utils/toast"
import CartModal from "utils/cartModal"

const MainLayout = (props) => {
    const [info, setInfo] = useState({ show: false, msg: "" })
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications)

    useEffect(() => {

        if ((notifications && notifications.error) || notifications.success) {
            setInfo(prevState => ({
                ...prevState, show: false
            }))
            const msg = notifications.msg ? notifications.msg : "Error"
            setInfo(prevState => ({
                ...prevState, show: true, msg: msg
            }))
            dispatch(clearNotification())
        }

    }, [notifications, dispatch])


    return <>
        {props.children}
        <Toast show={info.show} msg={info.msg} />
        <CartModal />
    </>
}

export default MainLayout