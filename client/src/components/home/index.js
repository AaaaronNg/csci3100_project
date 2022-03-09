import React, { useEffect, useState } from "react"
import Carousel from "./carousel"
import { productsBySort } from "store/actions/product.actions"
import { useDispatch, useSelector } from "react-redux"
import Cards from "./cards"
import Loader from "utils/lorder"
import { Modal } from "bootstrap"
import { userAddToCart } from "store/actions/user.actions"

import { Link } from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch()
    const productsByDate = useSelector(state => state.products.byDate)
    const notifications = useSelector(state => state.notifications)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const user = useSelector(state => state.users)

    const handleAddToCart = (product) => {
        let cartModal = new Modal(document.getElementById('CartModal'))
        if (!user.auth) {
            cartModal.show()
            return false
        }
        if (!user.data.verified) {
            cartModal.show()
            return false
        }
        setButtonDisabled(!buttonDisabled)
        dispatch(userAddToCart(product, user))
    }

    useEffect(() => {
        if (notifications.success || notifications.error) {
            setButtonDisabled(!buttonDisabled)
        }
    }, [notifications, buttonDisabled])

    useEffect(() => {
        dispatch(productsBySort())
    }, [dispatch])



    return <>

        <div class="container">
            <Carousel />


            <p class="fs-1 fw-bold py-5">
                LATEST PRODUCTS
            </p>

            {
                productsByDate ? <Cards byDate={productsByDate} handleAddToCart={handleAddToCart} buttonDisabled={buttonDisabled} /> : <Loader />
            }






        </div>

    </>
}


export default Home