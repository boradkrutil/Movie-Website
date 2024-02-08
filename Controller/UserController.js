const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require('../Model/UserModel')


class UserController{

    async InsertUser(req,res){

        try {
            let {firstName, lastName, email, password} = req.body
            console.log(req.body)
            if(!firstName|| !lastName || !email|| !password){
                return res.status(400).send({message:"Missing Dependency"})
            }
            password = bcrypt.hashSync(password, 8)
            if(!password) return res.status(500).send({message:"Missing Dependency"})
            let result = await userModel.model.create({firstName, lastName, email, password})
            if(!result) return res.status(500).send({message:"Somthing went wrong"})
            result = result._doc
            return res.status(200).send({message:"Success"})
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server Error"})
        }

     }

     async LoginAdmin(req, res){
        try {
            const {email, password} = req.body
            if(!email|| !password) return res.status(400).send({message:"Missing Dependency"})
            let userDetails = await userModel.model.findOne({email:email})
            if(!userDetails) return res.status(400).send({message:"unAuthorized"})
            userDetails = userDetails._doc
            if(!bcrypt.compareSync(password, userDetails.password)) return res.status({message:"unAuthorized"})
           const token = jwt.sign(userDetails, process.env.JWT_SECRET, {expiresIn:"30d"})
           if(!token) return res.status(500).send({message:"Somthing went wrong"})
           res.cookie('token', token)
           return res.status(200).send({message:"Success", token:token})
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server Error"})
        }
     }
}

const userController = new UserController()
module.exports = userController