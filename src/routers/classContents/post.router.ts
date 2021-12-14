import { Router } from "express";
import { ensureIsTeacher } from "../../middlewares/ensureIsTeacher";
import { ensurePostExists } from "../../middlewares/ensurePostExists";
import {
    postCreateController,
    postDeleteController,
    postListController,
    postUpdateController,
    postViewController
} from "../../controllers/classController/postController";

const postRouter = Router();

postRouter.get("/", postListController.handle);
postRouter.get("/:post_id", ensurePostExists,postViewController.handle);
postRouter.post("/", ensureIsTeacher, postCreateController.handle);
postRouter.patch("/:post_id", ensurePostExists,ensureIsTeacher, postUpdateController.handle);
postRouter.delete("/:post_id", ensurePostExists,ensureIsTeacher, postDeleteController.handle);


export { postRouter };