import React from "react"
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"


const Footer = () => {


    return <>
        <div class="px-5">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">

                    </a>
                    <span class="text-muted">&copy; 2022 Company, Inc. All rights reserved.</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-primary" href="#">
                        <BsFacebook size={30} />
                    </a></li>
                    <li class="ms-3"><a class="text-danger" href="#">
                        <BsInstagram size={30} />
                    </a></li>
                    <li class="ms-3"><a class="text-primary" href="#">
                        <BsTwitter size={30} />
                    </a></li>
                </ul>
            </footer>
        </div>


    </>
}


export default Footer