import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.config.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRouter from "./routes/auth.routes.js";


dotenv.config();
connectDB();

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use('/users', userRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    process.env.PORT ? process.env.PORT : 5000,
    process.env.HOST ? process.env.HOST : "127.0.0.1",
    console.log(`App is now live on port 5000`.white.bold)
);