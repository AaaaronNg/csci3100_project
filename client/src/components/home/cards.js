import React from "react"


const Cards = ({ byDate, handleAddToCart, buttonDisabled }) => {



    const generateCard = () => (
        byDate ? byDate.map((item, i) => (
            <div class="col-sx-1" key={i}>
                <div class="card h-100">

                    <div class="card-body text-center ">
                        <img src={item.images[0] ? item.images[0] : "/images/image_not_availble.png"} class="card-img-top" alt="not avaiable" />
                        <h6 class="card-title">{item.name}</h6>

                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="text-center fw-bold">${item.price}</div>
                        </li>

                    </ul>
                    <div class="card-footer">
                        <div class="d-grid ">


                            <button class="btn btn-secondary" type="button" disabled={buttonDisabled} onClick={() => handleAddToCart(item)}>
                                Add to Cart
                </button>



                        </div>
                    </div>
                </div>
            </div >
        )) : null
    )


    return <>
        <div class="row row-cols-sm-2  row-cols-md-4 g-4 px-3">
            {generateCard()}
        </div>
    </>
}

export default Cards