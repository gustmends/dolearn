import { NextFunction, Request, Response } from "express";
import { WebError, WebDefault } from "../model/WebError";

function errorHandler(err: Error, request: Request, response: Response, next: NextFunction) {
    if(err instanceof WebError || err instanceof WebDefault) {
        return response.status(err.status).json({
            error: err.message,
            code: err.code,
            data: err.data
        });
    } else {
        return response.status(500).json({
            error: "Internal Error",
            code: "internal_error"
        });
    }
}

export { errorHandler };