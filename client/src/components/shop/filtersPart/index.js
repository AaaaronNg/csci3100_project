
import React from "react"
import SideBar from "components/shop/filtersPart/sideBar"
import Content from "components/shop/content/index"


const FilterPart = ({ products, changeCurrentPage, handlePriceFilters }) => {




    return <>
        <nav class="navbar navbar-dark bg-secondary d-block d-md-none">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

        <div class="container-fluid">
            <div class="row">
                <nav id="sidebarMenu" class="col-md-3 col-lg-3 d-md-block bg-light sidebar collapse">

                    <SideBar
                        handlePriceFilters={handlePriceFilters}
                    />
                </nav>

                <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4">

                    <Content products={products} changeCurrentPage={changeCurrentPage} />

                </main>
            </div>
        </div>
    </>
}

export default FilterPart

