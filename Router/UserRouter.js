const express = require("express")
const userController = require("../Controller/UserController")

const UserRouter = express.Router()

UserRouter.post("/", userController.InsertUser)
UserRouter.post("/login", userController.LoginAdmin)

module.exports = UserRouter