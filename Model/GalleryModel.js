const { default: mongoose } = require("mongoose");

class GalleryModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String, required:true},
            path:{type:String, required:true}

        },{timestamps: true})

        this.model = mongoose.model("tbl_gallery", this.schema)

    }
  
    AddFile(data){
        return this.model.create(data)
    }
    getFile(data){
        return this.model.find(data)
    }

    getWithFIlter(filter){
        return this.model.find(filter)
    }

    deleteFile(ids){
        return this.model.deleteMany({_id:ids})
    }
}



const galleryModel = new GalleryModel()
module.exports = galleryModel
