const mongoose = require("mongoose")

const snackTypeSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const SnackType = mongoose.model("SnackType", snackTypeSchema)

module.exports = { SnackType }