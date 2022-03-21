import React, { useState, useEffect } from "react"
import DashboardLayout from "hoc/dashboardLayout"
import UsersTable from "./usersTable"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, updatePW } from "store/actions/user.actions"
import ModalPW from "./modal"
import * as Yup from "yup"
import Loader from "utils/lorder"
import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom';



const UserList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.users.userList)
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)

    const formik = useFormik({
        initialValues: {
            password: "", confirm_password: ""
        },
        validationSchema: Yup.object({
            password: Yup.string().required("This field is required"),
            confirm_password: Yup.string()
                .required("This field is required")
                .oneOf([Yup.ref("password"), null], "Password must match")


        }),
        onSubmit: (values) => {
            setLoading(true)
            let password = values.confirm_password
            dispatch(updatePW({ password, id }))

        }
    })

    useEffect(() => {
        if (notifications && notifications.success) {
            document.getElementById("close").click()
        } else {
            setLoading(false)
        }
    }, [notifications, navigate])


    const getUserId = (id) => {
        setId(id)
    }

    useEffect(() => {
        dispatch(getAllUsers())

    }, [dispatch])

    return <>
        <DashboardLayout>
            <div class="h1 fw-bold">User List</div>
            <div class="bg-light">
                {
                    userList ? <UsersTable userList={userList} getUserId={(id) => getUserId(id)} />
                        : <Loader />
                }
            </div>
            <ModalPW formik={formik} lording={loading} />
        </DashboardLayout>

    </>

}

export default UserList