//require("dotenv").config({path:"./env"});
import dotenv from "dotenv";
import connection from "./db/index.js"; 
import app from "./app.js"

dotenv.config({
    path: "./env"
});

connection()
.then(() =>{
    app.on("error",(error) => {
        console.log("Error:", error)
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}) // promices
.catch((err)=>{
    console.log("MONGODB connection failed", err);
})






/* Connecting to MongoDB and starting the server
import express from "express";
const app = express()

( async ()=>{
    try{
        mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        app.on("error",(error) => {
            console.log("Error: ", error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        throw error;
    }
})()
*/