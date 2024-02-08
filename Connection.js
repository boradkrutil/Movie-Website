const { default: mongoose } = require("mongoose");

async function ConnectDb(){
    try {
        await mongoose.connect("mongodb+srv://krutilborad2020:Krutil1230@MovieApp.k43cyjq.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectDb