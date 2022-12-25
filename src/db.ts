import mongoose from 'mongoose';
const mongoURI = 'mongodb://localhost:27017/google_api?readPreference=primary&ssl=false';

// connceting to mogo db using the URI
export const connectToMongo = ()=>{
    mongoose.set("strictQuery", false);

    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

// db object
export const getDB = ()=>{
    return mongoose.connection.db
}
