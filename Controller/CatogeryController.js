const catogeryModel = require("../Model/CatogeryModel")



class CatogeryController {

    async AddCatogery(req, res) {
        try {
            const { name, alise } = req.body
            if (!name || !alise) return res.status(400).send({ message: "Missing Dependency" })
            const result = await catogeryModel.AddCatogery({...req.body})
            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async UpdateCategory(req, res) {
        try {
            const { name, alise, _id } = req.body
            if (!name || !alise || !_id) return res.status(400).send({ message: "Missing Dependency" })
            const result = await catogeryModel.UpdateCatogery(_id, req.body)
            if (!result || result.modifiedCount <= 0) {
                return res.status(500).send({ message: "Somthing went wrong" })
            }
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async getCategory(req, res) {
        try {
            const result = await catogeryModel.GetCategory()
            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).render("category", {data:result})
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async DeleteCategory(req, res) {
        try {
            const { id } = req.params
            const result = await catogeryModel.catogery.deleteOne({ _id: id })
            if (!result || result.deletedCount <= 0) return res.status(500).send({ message: "Somthing Went wrong" })
            return res.status(200).send({ message: "Succuse" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async EditCategory(req, res){
        try {
            const{id} = req.params
            if(!id) return res.status(500).send({message:"Missing Dependency"})
            const result = await catogeryModel.catogery.findById(id)
        if (!result) return res.status(500).send({message:"Somthind went wrogn"})
            return res.status(200).render("EditCategory",{name:result.name, alise:result.alise})
        } catch (error) {
            console.log(error);
        }
    }
}

const catogeryController = new CatogeryController()
module.exports = catogeryController