import {ApiError} from "../exceptions/ApiError";
import {ErrorRequestHandler} from "express";


const errorMiddleware: ErrorRequestHandler =  (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        res.status(err.status).json({success: false, message: err.message});
        return
    }
    res.status(500).json({success: false, message: 'Internal server error'})
    return
};

export default errorMiddleware;
