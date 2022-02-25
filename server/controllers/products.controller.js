const { productsService } = require("../services/")

const productsController = {
    async addProduct(req, res, next) {
        try {
            //console.log("test")
            const product = await productsService.addProduct(req.body)
            res.json(product)
        } catch (error) {
            next(error)
        }
    },
    async getallProducts(req, res, next) {
        try {
            const products = await productsService.getallProducts(req)
            res.json(products)
        } catch (error) {
            next(error)
        }
    },
    async getProductById(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productsService.getProductById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    },
    async deleteProductById(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productsService.deleteProductById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    },
    async paginateProducts(req, res, next) {
        try {
            const products = await productsService.paginateProducts(req);
            res.json(products);
        } catch (error) {
            next(error);
        }
    },
}

module.exports = productsController