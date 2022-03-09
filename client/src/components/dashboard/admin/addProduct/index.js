import React, { useState, useEffect } from "react"
import DashboardLayout from "hoc/dashboardLayout"
import Loader from "utils/lorder"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllSnackTypes } from "store/actions/snackType.actions"
import { productAdd } from "store/actions/product.actions"

import * as Yup from "yup"
import { useFormik } from "formik"

import AddProductForm from "./addProductForm"
import UploadImg from "./uploadImg"
import Viewer from "./viewer"

const AddProduct = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const snackTypes = useSelector(state => state.snackTypes.allSnackTypes)
    const dispatch = useDispatch();
    ///console.log(snackTypes)

    useEffect(() => {
        dispatch(getAllSnackTypes())
    }, [dispatch])


    const formik = useFormik({
        initialValues: {
            productCode: "",
            name: "",
            snackType: "",
            description: "",
            price: "",
            available: "",
            images: []
        },
        validationSchema: Yup.object({
            productCode: Yup.string()
                .required("Product Code is required"),
            name: Yup.string()
                .required("Name is required"),
            snackType: Yup.string()
                .required("Type of snack is required"),
            description: Yup.string()
                .required("Description is required"),
            price: Yup.number().required("Price is required")
                .min(1, "the min price is $1")
                .max(100000, "the max price is 100000"),
            available: Yup.number()
                .required("In Stock?")
                .min(0, "the number should be greater than or equal to 0"),

        }),
        onSubmit: (values) => {
            setLoading(true)
            //console.log(values)
            dispatch(productAdd(values))
            //console.log(values)
        }
    })

    const handleImgValues = (img) => {
        const imgArr = formik.values.images
        imgArr.push(img.url)
        formik.setFieldValue("images", imgArr)
    }

    const deleteImg = (index) => {
        const imgArr = formik.values.images
        imgArr.splice(index, 1)
        formik.setFieldValue("images", imgArr)
    }

    useEffect(() => {
        if (notifications && notifications.success) {

            navigate("/dashboard/admin_products")
        }

        if (notifications && notifications.error) {
            setLoading(false)
        }


    }, [notifications, navigate])



    return <>
        <DashboardLayout>
            <Viewer formik={formik} deleteImg={(index) => deleteImg(index)} />
            <UploadImg imgValues={(img) => handleImgValues(img)} />
            <AddProductForm formik={formik} snackTypes={snackTypes} />
        </DashboardLayout>
    </>
}

export default AddProduct