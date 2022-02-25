const { snackTypeService } = require("../services")

const snackTypeController = {
    async addSnackType(req, res, next) {
        try {
            const snackType = await snackTypeService.addSnackType(req.body.snackType)
            res.json(snackType)
        } catch (error) {
            next(error)
        }
    },
    async getSnackType(req, res, next) {
        try {
            const id = req.params.id
            const snackType = await snackTypeService.getSncakTypeById(id)
            res.json(snackType)
        } catch (error) {
            next(error)
        }
    },
    async getSnackTypes(req, res, next) {
        try {
            const snackTypes = await snackTypeService.getSnackTypes(req.body)
            res.json(snackTypes)
        } catch (error) {
            next(error)
        }
    },
    async deleteSnackTypeById(req, res, next) {
        try {
            const id = req.params.id
            const snackType = await snackTypeService.deleteSnackTypeById(id)
            res.json(snackType)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = snackTypeController