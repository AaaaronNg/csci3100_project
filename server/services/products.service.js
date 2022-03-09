const { Product } = require("../models/product");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const product = require("../models/product");
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "df0rxtpne",
    api_key: "814979278633518",
    api_secret: `${process.env.CLOUD_API_PW}`
})

const imgUpload = async (req) => {

    try {
        const upload = await cloudinary.uploader.upload(req.files.file.path, {
            public_id: `${Date.now()}`,
            folder: "csci3100_project",
        })


        return {
            public_id: upload.public_id,
            url: upload.url,
        }

    } catch (error) {
        throw error
    }
}

const addProduct = async (body) => {
    try {
        const product = new Product({
            ...body
        })
        await product.save()
        return product
    } catch (error) {
        throw error
    }
}

const getProductById = async (id) => {
    try {
        const product = await Product.findById(id).populate("snackType")
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
        }
        return product
    } catch (error) {
        throw error
    }
}

const deleteProductById = async (id) => {
    try {

        const product = await Product.findByIdAndRemove(id);
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
        }
        return product;
    } catch (error) {
        throw error;
    }
};

const getallProducts = async (req) => {
    try {
        const products = await Product.find({})
            .populate("snackType")
            .sort([[req.query.sortBy, req.query.order]])
            .limit(parseInt(req.query.limit));
        return products
    } catch (error) {
        throw error
    }
}

const paginateProducts = async (req) => {
    try {
        //console.log("hello")
        let aggQueryArray = [];

        if (req.body.keywords && req.body.keywords != "") {
            //console.log(req.body.keywords)
            const re = new RegExp(`${req.body.keywords}`, "gi");
            aggQueryArray.push({
                $match: { name: { $regex: re } },
            });
        }

        //console.log(aggQueryArray)

        //console.log(req.body.snackType)

        if (req.body.snackType && req.body.snackType != "") {
            let snackTypeArray = req.body.snackType.map((item) =>
                mongoose.Types.ObjectId(item)
            );
            aggQueryArray.push({
                $match: { snackType: { $in: snackTypeArray } },
            });
        }

        if (
            (req.body.min && req.body.min > 0) ||
            (req.body.max && req.body.max < 10000)
        ) {
            if (req.body.min) {
                aggQueryArray.push({
                    $match: {
                        price: { $gt: req.body.min },
                    },
                });
            }
            if (req.body.max) {
                aggQueryArray.push({
                    $match: {
                        price: { $lt: req.body.max },
                    },
                });
            }
        }

        //console.log(aggQueryArray)

        aggQueryArray.push(
            {
                $lookup: {
                    from: "snacktypes",
                    localField: "snackType",
                    foreignField: "_id",
                    as: "snackType",
                },
            },
            { $unwind: "$snackType" },
        );


        let aggQuery = Product.aggregate(aggQueryArray);
        //console.log(aggQuery)

        const options = {
            page: req.body.page,
            limit: 4,
            sort: { date: "desc" },
        };
        const products = await Product.aggregatePaginate(aggQuery, options);
        //console.log("products", products)
        return products;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    addProduct,
    getallProducts,
    getProductById,
    deleteProductById,
    paginateProducts,
    imgUpload
}