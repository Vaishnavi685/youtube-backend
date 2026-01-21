import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" // access cookies from users browser and can set cookies too

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // to parse json data with limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb"})) // to parse form data
app.use(express.static("public")) // to serve static files from public folder

app.use(cookieParser()) // to parse cookies from request


// routes import
import userRouter from  './routes/user.routes.js';



// routes declaration
app.use("/api/v1/user", userRouter)


// http://localhost:8000/api/v1/user/register

export default app;