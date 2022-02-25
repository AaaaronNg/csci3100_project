const express = require("express")
const router = express.Router();
const productsController = require("../controllers/products.controller");
const auth = require("../middleware/auth");
const formidableMiddleware = require("express-formidable")


router.post(
    "/",
    auth("createAny", "product"),
    productsController.addProduct
)


router
    .route("/product/:id")
    .get(productsController.getProductById)
    //.patch(auth("updateAny", "product"), productsController.updateProductById)
    .delete(auth("deleteAny", "product"), productsController.deleteProductById);


router.post("/paginate/all", productsController.paginateProducts);

router.get("/all", productsController.getallProducts);


module.exports = router