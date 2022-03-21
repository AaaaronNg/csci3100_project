const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const usersController = require("../controllers/users.controller")

router.route("/profile")
    .get(auth("readOwn", "profile"), usersController.profile)
    .patch(auth("readOwn", "profile"), usersController.updateUserProfile)



router.patch("/email", auth("updateOwn", "profile"), usersController.updateUserEmail)

router.get("/verify", usersController.verifyAccount);

router.patch("/updateCart", auth("updateOwn", "profile"), usersController.updateUserCart)

router.patch(
    "/removeFromCart",
    auth("updateOwn", "profile"),
    usersController.removeFromCart
)

router.get("/userList", usersController.getAllUsers)

router.patch("/rmoveProfilePic", usersController.removeProfilePic)
router.patch("/addProfilePic", usersController.addProfilePic)

module.exports = router