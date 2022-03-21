import React, { useState, useEffect } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import MainLayout from "./hoc/mainLayout"
import Header from "./components/navigation/header"
import Footer from "./components/navigation/footer"
import Home from "./components/home"

import Loader from "utils/lorder"
import { useSelector, useDispatch } from "react-redux"
import { userIsAuth, userLogout } from "store/actions/user.actions"

import Login from "./components/auth/login"
import Register from "./components/auth/register"
import UserInfo from "./components/dashboard/user/userInfo"
import AdminProducts from "components/dashboard/admin/products/index"
import AddProduct from "components/dashboard/admin/addProduct/index"
import Shop from "components/shop/index"
import VerifyPage from "components/auth/verifyPage/index"
import MyCart from "components/dashboard/myCart/index"
import PurchaseHis from "components/dashboard/purchaseHis/index"
import UserList from "components/dashboard/admin/userList/index"

import RouterGuard from "./hoc/routeGuard"



const Router = () => {
    const [loading, setLoading] = useState(true)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(userIsAuth())
    }, [dispatch])

    const logoutUser = () => {

        dispatch(userLogout())
    }

    useEffect(() => {
        if (users.auth !== null) {
            setLoading(false)
        }
    }, [users])

    return <>
        <BrowserRouter>
            {
                loading ? <div style={{ padding: "300px" }}>
                    <Loader />
                </div> : <>
                        <Header user={users} logoutUser={logoutUser} />
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/shop/snackType/:id" element={<Shop />} />
                                <Route path="/dashboard/user_info" element={
                                    <RouterGuard>
                                        <UserInfo />
                                    </RouterGuard>
                                } />
                                <Route path="/dashboard/admin_products" element={
                                    <RouterGuard>
                                        < AdminProducts />
                                    </RouterGuard>
                                } />
                                <Route path="/dashboard/add_products" element={
                                    <RouterGuard>
                                        < AddProduct />
                                    </RouterGuard>
                                } />
                                <Route path="/dashboard/user_cart" element={
                                    <RouterGuard>
                                        <MyCart />
                                    </RouterGuard>
                                } />
                                <Route path="/verify" element={
                                    <RouterGuard>
                                        <VerifyPage />
                                    </RouterGuard>
                                } />
                                <Route path="/dashboard/purchase_history" element={
                                    <RouterGuard>
                                        <PurchaseHis />
                                    </RouterGuard>
                                } />

                                <Route path="/dashboard/user_list" element={
                                    <RouterGuard>
                                        <UserList />
                                    </RouterGuard>
                                } />



                            </Routes>
                        </MainLayout>
                        <Footer />
                    </>
            }
        </BrowserRouter>
    </>
}

export default Router