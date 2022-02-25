const mongoose = require("mongoose");

const URI = process.env.DB_ACCESS
console.log("URI", URI)
            

const connectDb = async() =>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }
    catch (err){
        console.log(err);
        process.exit(1);
    } 
}

module.exports = connectDb;