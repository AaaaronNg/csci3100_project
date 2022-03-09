import React, { useReducer, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { productsByPaginate } from "store/actions/product.actions"
import { getSnackTypeById } from "store/actions/snackType.actions"
import { useParams } from "react-router-dom"
import FilterPart from "components/shop/filtersPart/index"


const defaultValues = { keywords: "", snackType: [], min: 0, max: 100, page: 1 }

const Shop = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )

    const products = useSelector(state => state.products.byPaginate)
    const snackType = useSelector(state => state.snackTypes.snackTypeById)


    const handlePriceFilters = (values) => {
        setSearchValues({ min: values.min, max: values.max, page: 1 })
    }

    useEffect(() => {
        dispatch(getSnackTypeById(params.id))
        setSearchValues({ snackType: [params.id] })
    }, [dispatch, params.id])

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])



    const changeCurrentPage = (page) => {
        setSearchValues({ page: page })
    }

    const imges = [
        {
            snackType: "Crisps",
            img: "/images/snackTypes/Crisps.png"
        },
        {
            snackType: "Chocolates",
            img: "/images/snackTypes/Chocolates.png"
        },
        {
            snackType: "Nuts & Seeds",
            img: "/images/snackTypes/Nuts.png"
        },
        {
            snackType: "Chewing Gum",
            img: "/images/snackTypes/Gums.png"
        },
        {
            snackType: "Biscuits",
            img: "/images/snackTypes/Biscuits.png"
        }
    ]

    const generateSnackImg = () => {
        if (snackType) {
            const item = imges.find(item => item.snackType === snackType.name)

            return <>
                <div class="row g-0 align-self-stretch container-fluid pb-4">
                    <div class="col-md-6 col-sm-12" style={{ "backgroundColor": "#537aa1" }}>
                        <div class="container p-5">
                            <p class="fs-1 px-5 fw-bold">
                                {snackType.name}
                            </p>
                            <p class="fs-6 px-5" >
                                {snackType.description}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <img class="img-fluid" src={item.img} alt="snackType_img" />
                    </div>

                </div></>
        } else {
            return <></>
        }

    }




    return <>

        {generateSnackImg()}

        <FilterPart
            products={products}
            changeCurrentPage={(page) => changeCurrentPage(page)}
            handlePriceFilters={(values) => handlePriceFilters(values)}
        />


    </>
}

export default Shop