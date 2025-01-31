import "dotenv/config";
import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import router from "./router/index";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(errorMiddleware);

async function main() {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}


main();
