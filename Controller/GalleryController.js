const Randomstring = require('randomstring');
const galleryModel = require('../Model/GalleryModel');
const fs = require("fs")

const uploadFile =(file) =>{
    let name = Randomstring.generate({
        length:12,
        charset:"alphabetic"
    })
    let ext = file.name.split(".")
    ext = ext[ext.length-1]
    name+= "."+ext
    let path = "/public/images/"+name
    file.mv("."+path)
    return{
        name,
        path
    }
}


class GalleryController{

    async UploadFile(req, res){
        try {
            const  file = req.files.file
            const FileDetails = await uploadFile(file)
            const result = await galleryModel.AddFile(FileDetails)
            if(!result) return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success", fileDetails:result})
            
        } catch (error) {
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

    async GetFile(req, res){
        const result = await galleryModel.getFile()
        if(!result) return res.status(500).send({message:"Somthing went wrong"})
        return res.status(200).render("Gallery",{ files:result})
    }

    async DeleteFiles(req, res){
        try {
            const {files} = req.body
            
            const fileDetails = await galleryModel.getWithFIlter({_id:files})
            let i = 0
            while (i< fileDetails.length) {
                fs.unlinkSync("."+fileDetails[i].path)
                i++
            }

            const result = await galleryModel.deleteFile(files)
            if(!result || result.deletedCount <= 0) return res.status(500).send({message:"Somthing went wrong"})
            return res.status(200).send({message:"Success"})
            
        } catch (error) {
            return res.status(500).send({message:"Internal Server Error"})
        }
    }
}

const galleryController = new GalleryController()
module.exports = galleryController