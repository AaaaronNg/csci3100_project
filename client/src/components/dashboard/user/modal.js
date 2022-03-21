import React from "react"
import Lorder from "utils/lorder"



const ModalPW = ({ formik, loading }) => {


    return <>
        <div class="modal fade" id="userChangePWModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
                            <button id="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                loading ? <Lorder /> : <> <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="password" id="password" name="password" class={(formik.touched["password"] && formik.errors["password"]) ? "form-control is-invalid" : "form-control"} placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                                        <label for="floatingPassword">Password</label>
                                        {formik.touched["password"] && formik.errors["password"] ? (
                                            <div class="invalid-feedback">
                                                This field is required
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                    <div class="mb-3">
                                        <div class="form-floating">
                                            <input type="password" id="confirm_password" name="confirm_password" class={(formik.touched["confirm_password"] && formik.errors["confirm_password"]) ? "form-control is-invalid" : "form-control"} placeholder="Password" onChange={formik.handleChange} value={formik.values.confirm_password} />
                                            <label for="floatingPassword">Confirm Password</label>
                                            {formik.touched["confirm_password"] && formik.errors["confirm_password"] ? (
                                                <div class="invalid-feedback">
                                                    This field is required or unmatch
                                                </div>
                                            ) : null}
                                        </div>
                                    </div> </>
                            }

                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success" disabled={loading} >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default ModalPW