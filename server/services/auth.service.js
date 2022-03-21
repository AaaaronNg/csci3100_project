const { User } = require("../models/user")
const httpStatus = require("http-status")
const { ApiError } = require("../middleware/apiError")
const userService = require("./user.service")


const createUser = async (email, password) => {
    try {
        if (await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry, email taken")
        }
        const user = new User({
            email,
            password
        })
        await user.save()

        return user
    } catch (error) {
        throw error
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken()
    return token
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await userService.findUserByEmail(email)
        //console.log(!user)
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "The email haven't registered yet.")
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry, wrong password")
        }
        return user

    } catch (error) {
        throw error
    }
}

const updatePW = async (req) => {
    try {
        const user = await userService.findUserById(req.body.id)
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "User not found.")
        }
        await user.updatePassword(req.body.password)
        await user.save()
        return user
        //console.log(req.body)
    } catch (error) {
        throw error
    }
}


module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword,
    updatePW
}