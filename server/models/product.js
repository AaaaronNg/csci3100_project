const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    productCode: {
        require: [true, "need a productCode"],
        type: String,
        unique: 1,
        maxlength: 250
    },
    name: {
        require: [true, "need a name"],
        type: String,
        unique: 1,
        maxlength: 250
    },
    snackType: {
        require: [true, "need a snack type"],
        type: Schema.Types.ObjectId,
        ref: "SnackType"
    },
    description: {
        require: [true, "need a description"],
        type: String,
        maxlength: 1000,
    },
    price: {
        require: true,
        type: Number,
        maxlength: 255,
    },
    available: {
        require: [true, "how many of this we own"],
        type: Number,
        maxlength: 1000,
        default: 0,
    },
    itemSold: {
        require: true,
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = {
    Product,
};