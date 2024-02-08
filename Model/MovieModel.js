const { default: mongoose } = require("mongoose");

class MovieModel {
    constructor() {
        this.schema = new mongoose.Schema({
            title: { type: String, required: true },
            alias: { type: String, required: true },
            category: { type: mongoose.Types.ObjectId, ref: "tbl_categorys" },
            fetureImage: { type: mongoose.Types.ObjectId, ref: "tbl_gallery",required:true },
            description: { type: String,default:null },
            headerScript: { type: String,default:null },
            bodyScript: { type: String, default:null},

        }, { timestamps: true })

        this.model = mongoose.model("tbl_movies", this.schema)
    }

    addMovie(data) {
        return this.model.create(data)
    }
    getMovie() {
        return this.model.find().populate(["fetureImage", "category"])
    }
    AnimationCat(){
        return this.model.find({"category":"65b48bdc65840e8c8f2d349c"}).populate(["fetureImage", "category"])
    }
    deleteMoovie(id) {
        return this.model.deleteOne({ _id: id })
    }
    updateMovie(data) {
        return this.model.updateMany({ _id: data._id }, { title: data.title, alias: data.alias, category: data.category, description: data.description, headerScript: data.headerScript, bodyScript: data.bodyScript, fetureImage:data.fetureImage })
    }
}

const movieModel = new MovieModel()
module.exports = movieModel