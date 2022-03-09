import React from "react"




const Card = ({ product, handleAddToCart, buttonDisabled }) => {



    return <><div class="card shadow-sm h-100 ">
        <img src={product.images[0] ? product.images[0] : "/images/image_not_availble.png"} class="card-img-top" alt="not avaiable" />

        <div class="card-body ">
            <h6 class="card-title">{product.name}</h6>

        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="text-center fw-bold">${product.price}</div>
            </li>




        </ul>
        <div class="card-footer">
            <div class="d-grid ">

                <button class="btn btn-secondary" type="button" disabled={buttonDisabled} onClick={() => handleAddToCart(product)}>
                    Add to Cart
                </button>




            </div>
        </div>
    </div>
    </>
}

export default Card