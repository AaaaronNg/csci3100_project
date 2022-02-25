const { SnackType } = require("../models/snackType")
const { ApiError } = require("../middleware/apiError")
const httpStatus = require("http-status")
const snackType = require("../models/snackType")

const addSnackType = async (snackTypeName) => {
    try {
        const snackType = new SnackType({
            name: snackTypeName
        })
        await snackType.save()
        return snackType
    } catch (error) {
        throw error
    }
}

const getSnackTypes = async (args) => {
    try {
        //console.log("test")
        let order = args.order ? args.order : "asc"
        const snackTypes = await SnackType.find({})
            .sort([["_id", order]])

        if (!snackTypes) {
            return new ApiError(httpStatus.NOT_FOUND, "snackTypes not found")
        }
        return snackTypes
    } catch (error) {
        throw error
    }
}

const getSncakTypeById = async (id) => {
    try {
        const snackType = await SnackType.findById(id)
        if (!snackType) {
            throw new ApiError(httpStatus.NOT_FOUND, "snack type not found")
        }
        return snackType
    } catch (error) {
        throw error
    }
}

const deleteSnackTypeById = async (id) => {
    try {
        const snackType = await SnackType.findByIdAndRemove(id)
        return snackType
    } catch (error) {
        throw error
    }
}



module.exports = {
    addSnackType,
    getSnackTypes,
    getSncakTypeById,
    deleteSnackTypeById
}