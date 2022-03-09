import React from "react"


const Carousel = () => {

    const carouselItems = [
        {
            img: "images/featured/feature1.png",
            linkTo: "/shop"
        },
        {
            img: "images/featured/feature2.png",
            linkTo: "/shop"
        },
        {
            img: "images/featured/feature3.png",
            linkTo: "/shop"
        }
    ]


    return <>

        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active " data-bs-interval="5000">
                    <img src={carouselItems[0].img} class="d-block w-100" alt="carouselImg" />
                </div>
                <div class="carousel-item">
                    <img src={carouselItems[1].img} class="d-block w-100" alt="carouselImg" />
                </div>
                <div class="carousel-item">
                    <img src={carouselItems[2].img} class="d-block w-100" alt="carouselImg" />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </>
}

export default Carousel