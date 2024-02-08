const express = require('express');
const galleryController = require('../Controller/GalleryController');
const GalleryRouter = express.Router()

GalleryRouter.post("/", galleryController.UploadFile)
GalleryRouter.get("/", galleryController.GetFile)
GalleryRouter.post("/deleteFile", galleryController.DeleteFiles)


module.exports = GalleryRouter