import React, { useState } from "react"
import Loader from "utils/lorder"
import * as Yup from "yup"
import axios from "axios"
import { useFormik } from "formik"
import { getTokenCookie } from "utils/tools"
import { useSelector, useDispatch } from "react-redux"
import { addProfilePic } from "store/actions/user.actions"


const Uploadprofile = () => {
    const profilePic = useSelector(state => state.users.data.profilePic[0])
    const userId = useSelector(state => state.users.data._id)
    //console.log(userId)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: { pic: "" },
        validationSchema: Yup.object({
            img: Yup.mixed().required("Img is required")
        }),
        onSubmit: (values) => {
            setLoading(true)
            handleSubmit(values)
        }
    })


    const handleSubmit = (values) => {
        uploadImgAPI(values)

    }

    const uploadImgAPI = (values) => {
        let formData = new FormData()
        formData.append("file", values.img)

        axios.post("/api/products/upload", formData, {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": `Bearer ${getTokenCookie()}`
            }

        }).then(res => {
            let url = res.data.url
            dispatch(addProfilePic({ userId, url }))
            //console.log(url)
        }).catch(error => {
            alert(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return <>

        {
            profilePic ? <img
                src={profilePic}
                class="img-thumbnail rounded w-25 m-1 h-25 d-inline"
            /> : null
        }

        {
            loading ? <Loader /> :
                <form onSubmit={formik.handleSubmit}>
                    <div class="mb-3">
                        <input class={(formik.touched["img"] && formik.errors["img"]) ? "form-control is-invalid" : "form-control"} name="img" type="file" id="img" multiple
                            onChange={(e) => {
                                formik.setFieldValue("img", e.target.files[0])
                            }}
                        />
                    </div>
                    <div class="py-2">
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </div>
                </form>
        }
    </>
}

export default Uploadprofile