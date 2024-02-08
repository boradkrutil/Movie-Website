const express = require("express")
const catogeryController = require("../Controller/CatogeryController")
const CategoryRouter = express.Router()

CategoryRouter.post("/", catogeryController.AddCatogery)
CategoryRouter.put("/", catogeryController.UpdateCategory)
CategoryRouter.get("/", catogeryController.getCategory)
CategoryRouter.delete("/:id", catogeryController.DeleteCategory)
CategoryRouter.get("/:id", catogeryController.EditCategory)



module.exports = CategoryRouter