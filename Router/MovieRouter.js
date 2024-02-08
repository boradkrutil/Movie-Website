const express = require('express');
const movieController = require('../Controller/MovieController');
const MovieRouter = express.Router()

MovieRouter.post("/", movieController.AddMovie)
MovieRouter.get("/AddMovie", movieController.addMovie)
MovieRouter.get("/", movieController.GetMovie)
MovieRouter.delete("/:id", movieController.DeleteMovie)
MovieRouter.get("/:id", movieController.EditMovie)
MovieRouter.put("/", movieController.UpdateMovie)

module.exports = MovieRouter
