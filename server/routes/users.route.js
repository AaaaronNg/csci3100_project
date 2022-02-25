const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const usersController = require("../controllers/users.controller")

router.route("/profile")
    .get(auth("readOwn", "profile"), usersController.profile)
    .patch(auth("readOwn", "profile"), usersController.updateUserProfile)

router.patch("/email", auth("updateOwn", "profile"), usersController.updateUserEmail)

router.get("/verify", usersController.verifyAccount);

module.exports = router