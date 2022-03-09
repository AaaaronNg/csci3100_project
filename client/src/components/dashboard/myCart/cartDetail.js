import React, { useState } from "react"
import CartCard from "./cartCard"
import { removeFromCart, userPurchaseSuccess } from "store/actions/user.actions"
import { useDispatch } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import Loader from "utils/lorder"

const productHashMap = new Map()

const CartDetail = ({ products }) => {
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()


    const removeItem = (product) => {
        if (document.getElementById(product._id)) {
            setTotal((prevTotal) => (
                prevTotal - productHashMap.get(product._id) * product.price
            ))
        }
        dispatch(removeFromCart(product))
    }


    const getProductsTotalPrice = (product) => {
        console.log(productHashMap)
        if (document.getElementById(product._id)) {
            productHashMap.set(product._id, document.getElementById(product._id).value)
        }
        Total(products)
    }


    const Total = (products) => {
        let total = 0
        products.forEach((item) => {
            if (productHashMap.has(item._id)) {
                total += productHashMap.get(item._id) * item.price
            }
        })
        setTotal(total)
    }







    //console.log(getProductsTotalPrice())



    const generateItems = () => {
        //console.log(products)

        let items = products.map((item) => (
            {
                unit_amount: {
                    currency_code: "HKD",
                    value: item.price
                },
                quantity: productHashMap.get(item._id),
                name: item.name
            }
        ))

        return items
    }


    const generateUnits = () => (
        [{
            description: "csci3100_project",
            amount: {
                currency_code: "HKD",
                value: total,
                breakdown: {
                    item_total: {
                        currency_code: "HKD",
                        value: total
                    }
                }
            },
            items: generateItems()
        }]
    )



    console.log(total)

    return <>

        {
            products.map((item, i) => (
                <CartCard index={i}
                    product={item}
                    getProductsTotalPrice={(id) => getProductsTotalPrice(id)}
                    removeItem={(product) => removeItem(product)}
                />
            ))
        }

        <div class=" bg-light py-4 text-end">
            <span class="fw-bold px-3">TOTAL AMOUNT: $
                 {products ? total : null}
            </span>
        </div>
        <div class="p-3 text-center">
            {
                loading ? <Loader /> :

                    <PayPalButton
                        options={{
                            clientId: "AW_7Spaf5tBoazP8aVEgeuJxlLY9ZFycMzrpEf7wrz_OksRfe5YC4fLTXuilGMCpkf22oQhAJQ1O-EuH",
                            currency: "HKD",
                            disableFunding: "credit,card"
                        }
                        }


                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: generateUnits()
                            })
                        }}

                        onSuccess={(details, data) => {
                            dispatch(userPurchaseSuccess(details.id))
                            setLoading(true)
                        }}

                        onCancel={
                            (data) => {
                                setLoading(false)
                            }
                        }

                    />
            }
        </div>









    </>
}

export default CartDetail