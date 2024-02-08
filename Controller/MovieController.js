const catogeryModel = require("../Model/CatogeryModel")
const galleryModel = require("../Model/GalleryModel")
const movieModel = require("../Model/MovieModel")

class MovieControllert {

    async AddMovie(req, res) {
        try {
            const { title, alias, category, description,fetureImage, headerScript, bodyScript } = req.body
            const result = await movieModel.addMovie(req.body)
            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server Error" })

        }
    }

    async GetMovie(req, res) {
        try {
            const result = await movieModel.getMovie()
            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).render("MovieListing", {data:result})
        } catch (error) {
            return res.status(500).send({ message: "Internal server Error" })

        }
    }

    async DeleteMovie(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send({ message: "Missing Dependency" })
            const result = await movieModel.deleteMoovie(id)
            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server Error" })
        }
    }

    async UpdateMovie(req, res) {
        try {
            const { title, alias, category, description,fetureImage, headerScript, bodyScript, _id } = req.body
            if (!_id) return res.status(400).send({ message: "Missing Dependency" })
            const result = await movieModel.updateMovie(req.body)
            if (!result || result.modifiedCount <= 0) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server Error" })

        }
    }

    async addMovie(req,res){
        try {
            const gallary =await galleryModel.getFile()
            const category = await catogeryModel.GetCategory()
            if(!gallary || !category) return res.status(500).send({message:"Somthing went wrong"})
            return res.render("AddMovie", {gallary:gallary, category:category})
        } catch (error) {
            return res.status(500).send({ message: "Internal server Error" })
            
        }
    }

    async EditMovie(req,res){
        try {
            const{id} = req.params
            if(!id) return res.status(500).send({message:"Missing Dependency"})
            const result = await movieModel.model.findById(id).populate(["fetureImage", "category"])
            const categorys = await catogeryModel.GetCategory()
            const gallary = await galleryModel.getWithFIlter()
        if (!result || !categorys || !gallary) return res.status(500).send({message:"Somthind went wrogn"})
            return res.status(200).render("EditMovie",{title:result.title, alias:result.alias, category:result.category, fetureImage:result.fetureImage, description:result.description, headerScript:result.headerScript,bodyScript:result.bodyScript, categorys:categorys, gallary:gallary })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server Error" })

        }
    }
  
    async MovieDetail(req,res){
        try {
            const{id} = req.params
            if(!id) return res.status(500).send({message:"Missing Dependency"})
            const result = await movieModel.model.findById(id).populate(["fetureImage", "category"])
        const moviedetail = await movieModel.getMovie()
        if(!result)return res.status(500).send({message:"Somthind went wrogn"})
          return res.status(200).render("MovieDetail", {title:result.title, alias:result.alias, category:result.category, fetureImage:result.fetureImage, description:result.description, headerScript:result.headerScript,bodyScript:result.bodyScript, moviedetail:moviedetail })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server Error" })
            
        }
    }


    async SendData(req,res){
          const result = await movieModel.getMovie()
          const animation = await movieModel.AnimationCat()
          if(!result) return res.status(500).send({message:"Somthing went wrong"})
          return res.status(200).render("MovieApp", {data:result, animation:animation})

    }




    }


const movieController = new MovieControllert()
module.exports = movieController