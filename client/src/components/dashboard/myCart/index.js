import React from "react"
import DashboardLayout from "hoc/dashboardLayout"
import { useDispatch, useSelector } from "react-redux"
import CartDetail from "components/dashboard/myCart/cartDetail"




const MyCart = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.users.data.cart)

    return <>

        <DashboardLayout>
            {
                products && products.length > 0 ?
                    <div class="h1 fw-bold pt-3">
                        <CartDetail products={products} />
                    </div> :
                    <div >
                        there is nothing in your cart :(
                </div>
            }
        </DashboardLayout>

    </>
}

export default MyCart