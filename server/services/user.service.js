const { User } = require("../models/user")
const { ApiError } = require("../middleware/apiError")
const httpStatus = require("http-status")
const jwt = require("jsonwebtoken");
require("dotenv").config();


const getAllUsers = async () => {
    try {
        const users = await User.find({})
            .sort([["_id", "asc"]])

        if (!users) {
            return new ApitError(httpStatus.NOT_FOUND, "user not found")
        }

        return users
    } catch (error) {
        throw error
    }
}

const findUserByEmail = async (email) => {
    return await User.findOne({ email: email })
}

const validateToken = async (token) => {
    return jwt.verify(token, process.env.DB_SECRET);
};

const findUserById = async (_id) => {
    return await User.findById(_id)
}

const updateUserProfile = async (req) => {
    try {
        //console.log(req.body)
        const user = await User.findOneAndUpdate(
            {
                _id: req.user._id
            }, {
            "$set": {
                ...req.body
            }
        },
            {
                new: true
            }
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "user not found")
        }

        return user
    } catch (error) {
        throw error
    }
}

const updateUserEmail = async (req) => {
    try {
        if (await User.emailTaken(req.body.newemail)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken")
        }
        const user = await User.findOneAndUpdate(
            {
                _id: req.user._id,
                email: req.user.email
            }, {
            "$set": {
                email: req.body.newemail,
                verified: false
            }
        },
            {
                new: true
            }
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "user not found")
        }
        return user
    } catch (error) {
        throw error
    }
}

const updateUserCart = async (req) => {
    try {
        if (!req.body.currentUser) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }
        let duplicate = false;

        req.body.currentUser.cart.forEach((item) => {
            if (req.body.product._id == item._id) {
                duplicate = true
            }
        })

        if (duplicate) {
            throw new ApiError(httpStatus.CONFLICT, "Product has been added to your Cart");
        }

        const user = await User.findOneAndUpdate(
            { _id: req.body.currentUser._id },
            {
                $push: {
                    cart: {
                        _id: req.body.product._id,
                        price: req.body.product.price,
                        name: req.body.product.name,
                        images: req.body.product.images
                    }
                }
            },
            { new: true }
        )

        return user

    } catch (error) {
        throw error
    }
}

const removeFromCart = async (req) => {
    try {
        console.log(req.body.id)
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $pull: {
                    cart: { _id: req.body.id }
                }
            },
            { new: true }
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }

        return user
    } catch (error) {
        throw error
    }
}

const removeProfilePic = async (req) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            {
                $set: {
                    "profilePic": []
                }
            },
            { new: true }
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }
        return user
    } catch (error) {
        throw error
    }
}

const addProfilePic = async (req) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            {
                $push: {
                    profilePic: req.body.url
                }
            },
            { new: true }
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }
        return user
    } catch (error) {
        throw error
    }
}

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken,
    updateUserCart,
    removeFromCart,
    getAllUsers,
    addProfilePic,
    removeProfilePic
}