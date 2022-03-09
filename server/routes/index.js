const express = require("express")
const router = express.Router()
const authRoute = require("./auth.route")
const userRoute = require("./users.route")
const snackTypeRoute = require("./snackType.route")
const productRoute = require("./product.route")
const transactionRoute = require("./transaction.route")


const routesIndex = [
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/users",
        route: userRoute
    },
    {
        path: "/snackTypes",
        route: snackTypeRoute
    },
    {
        path: "/products",
        route: productRoute
    },
    {
        path: "/transaction",
        route: transactionRoute
    }
]

routesIndex.forEach((route) => {
    router.use(route.path, route.route)
})



module.exports = router