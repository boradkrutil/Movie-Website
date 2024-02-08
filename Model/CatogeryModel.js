const { default: mongoose } = require("mongoose");

class CatogeryModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String, required:true},
            alise:{type:String, required:true, unique:true},
        },{timestamps:true})

        this.catogery = mongoose.model("tbl_categorys", this.schema)
    }
    
    AddCatogery(data){
      return this.catogery.insertMany(data)
    }

    GetCategory(){
        return this.catogery.find({})
    }

    UpdateCatogery(_id, data){
        return this.catogery.updateOne({_id}, {name:data.name, alise:data.alise}) 
    }

    DeleteCatogery(_id){
        return this.catogery.deleteOne()
    }
}

const catogeryModel = new CatogeryModel()
module.exports = catogeryModel