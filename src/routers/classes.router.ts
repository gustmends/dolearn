import "express-async-error";
import { Router } from "express";
import { fileRouter } from "./classContents/file.router";
import { postRouter } from "./classContents/post.router";
import { videoRouter } from "./classContents/video.router";
import { ensureIsTeacher } from "../middlewares/ensureIsTeacher";
import { ensureClassExists } from "../middlewares/ensureClassExists";
import { 
    classCreateController,
    classDeleteController,
    classListContentsController,
    classListController,
    classUpdateController, 
    classViewController
} from "../controllers/classController";

const classRouter = Router();

classRouter.get("/", classListController.handle);
classRouter.get("/:class_id", ensureClassExists, classViewController.handle);
classRouter.get("/:class_id/contents", ensureClassExists, classListContentsController.handle);
classRouter.post("/", ensureIsTeacher, classCreateController.handle);
classRouter.patch("/:class_id", ensureClassExists, ensureIsTeacher, classUpdateController.handle);
classRouter.delete("/:class_id", ensureClassExists, ensureIsTeacher, classDeleteController.handle);

classRouter.use("/:class_id/contents/files", ensureClassExists, fileRouter);
classRouter.use("/:class_id/contents/posts", ensureClassExists, postRouter);
classRouter.use("/:class_id/contents/videos", ensureClassExists, videoRouter);


export { classRouter };