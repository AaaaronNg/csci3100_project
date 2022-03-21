import React, { useEffect } from "react"
import { GrCart } from "react-icons/gr"
import { BsFillPersonFill, BsQuestionCircle, BsShop } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllSnackTypes } from "store/actions/snackType.actions"

const Header = ({ user, logoutUser }) => {
    const dispatch = useDispatch()
    const snackTypes = useSelector(state => state.snackTypes.allSnackTypes)

    useEffect(() => {
        dispatch(getAllSnackTypes())
    }, [dispatch])

    const generateSnackType = () => (
        snackTypes ? snackTypes.map((item) => (
            <div class="px-5 bd-highlight ">
                <Link class="text-decoration-none text-dark" to={`/shop/snackType/${item._id}`}>
                    {item.name}
                </Link>
            </div>
        )) : null
    )

    return <>

        <nav class="py-2 border-bottom bg-success p-2 text-white bg-opacity-75">
            <div class="container d-flex flex-wrap  justify-content-center fw-bold">
                FREE SHIPPING ON ORDERS OVER $40
            </div>
        </nav>

        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">

                    <span class="fs-4">
                        <img class="img-fluil" src={"/images/logo.png"} width="200" alt="logo" />
                    </span>
                </Link>

                <ul class="nav nav-pills">
                    {
                        user.auth ?
                            <>


                                <Link class="me-3 pt-2 text-dark text-decoration-none" to="/dashboard/user_info">
                                    <BsFillPersonFill size={25} />
                                </Link>
                                <Link class="me-3 pt-2 text-dark text-decoration-none" to="/dashboard/user_cart">
                                    <GrCart size={25} />
                                </Link>

                                <div class="me-3 pt-1 text-dark text-decoration-none" >
                                    <button type="button" onClick={() => logoutUser()} class="btn btn-outline-dark fw-bold">log out</button>
                                </div>
                            </> :

                            <>
                                <Link class="me-3 pt-1 text-dark text-decoration-none" to="/login">
                                    <button type="button" class="btn btn-outline-dark fw-bold">log in</button>
                                </Link>
                            </>
                    }



                </ul>
            </header>
        </div>


        <nav class="pb-3">
            <div class="container d-flex flex-row fw-bold text-dark justify-content-center">
                {generateSnackType()}
            </div>
        </nav>


    </>
}


export default Header