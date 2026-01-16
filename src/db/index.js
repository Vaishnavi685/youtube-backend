import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 

// # Things that should remember to talk to db:- 
// async & await becoz db takes time
// try catch / promices

const connection = async () => {
    try{
        const connectionInstanace = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n Connected to MongoDB !! DB ost ${connectionInstanace.connection.host}`);
    }catch (error) {
        console.log("MongoDB connection FAILED!", error);
        process.exit(1);
    }
}

export default connection;