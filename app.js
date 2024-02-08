const express = require("express")
const ConnectDb = require("./Connection")
const CategoryRouter = require("./Router/CategoryRouter")
const GalleryRouter = require("./Router/GalleryRouter")
const expressFileUpload = require("express-fileupload")
const MovieRouter = require("./Router/MovieRouter")
const movieController = require("./Controller/MovieController")
const UserRouter = require("./Router/UserRouter")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express()


ConnectDb()
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use("/public", express.static("./public"))
app.use(expressFileUpload())

app.get("/login", (req, res) => {
    return res.status(200).render("LoginPage")
})
app.get("/moviedetail/:id", movieController.MovieDetail)

app.use(async(req, res, next) => {
    try {
        const {token} = req.cookies

        if(req.path === "/user/login" || req.path === "/"){
            return next()
        }
        if(!token){
            return res.redirect("/login")
        }

        const data = jwt.verify(token, process.env.JWT_SECRET)

        if (!data) {
            return res.redirect("/login")
        }

        next()
    } catch (error) {
        return res.redirect("/login")
    }
})

app.use("/category",CategoryRouter)
app.use("/gallery", GalleryRouter)
app.use("/movie", MovieRouter)
app.use("/user", UserRouter)

app.get("/", movieController.SendData)


app.get("/dashboard", (req, res) => {
    return res.status(200).render("index")
})


// app.get("/register", (req, res) => {
//     return res.status(200).render("RegisterPage")
// })

// app.get("/", (req,res) => {
//     return res.status(200).render("movieapp")
// })
// app.get("/movie", (req, res) =>{
//     return res.status(200).render("MovieListing")
// })

app.listen(5000, () => {
    console.log("Server Strated");
})