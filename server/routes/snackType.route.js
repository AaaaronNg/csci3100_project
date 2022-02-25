const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const snackTypeController = require("../controllers/snackType.controller")


router
    .route("/snackType/:id")
    .get(snackTypeController.getSnackType)
    .delete(auth("deleteAny", "snackType"), snackTypeController.deleteSnackTypeById)

router.post(
    "/snackType",
    auth("createAny", "snackType"),
    snackTypeController.addSnackType
)

router.get("/all", snackTypeController.getSnackTypes)

module.exports = router