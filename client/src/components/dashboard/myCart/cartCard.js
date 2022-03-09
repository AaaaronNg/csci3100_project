import React from "react"



const CartCard = ({ product, index, removeItem, getProductsTotalPrice }) => {



    return <>

        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img
                        src={product.images[0] ? product.images[0] : "/images/image_not_availble.png"}
                        class="card-img-top"
                        alt="not avaiable"
                        style={{ "height": "280px", "width": "280px" }}

                    />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{product.name}</h5>
                        <div class="card-text">
                            <div class="container">

                            </div>
                        </div>

                        {product.price}
                        <input type="number" id={product._id} min="1" onChange={() => getProductsTotalPrice(product)} class="form-control" style={{ "width": 100 }} />
                        <button type="button" onClick={() => removeItem(product)} class="btn btn-outline-danger">Remove</button>





                    </div>
                </div>
            </div>
        </div>


    </>
}


export default CartCard

