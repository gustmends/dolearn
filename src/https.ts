import "dotenv/config";
import "express-async-error";
import express from "express";
import cors from "cors";
import { userRouter } from "./routers/users.router";
import { classRouter } from "./routers/classes.router";
import { errorHandler } from "./middlewares/errorHandling";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/classes", ensureAuthenticated, classRouter);

app.use(errorHandler);

export { app };