import { Router } from "express";
import { ensureIsTeacher } from "../../middlewares/ensureIsTeacher";
import { ensureVideoExists } from "../../middlewares/ensureVideoExists";
import {
    videoCreateController,
    videoDeleteController,
    videoListController,
    videoUpdateController,
    videoViewController
} from "../../controllers/classController/videoController";

const videoRouter = Router();

videoRouter.get("/", videoListController.handle);
videoRouter.get("/:video_id", ensureVideoExists, videoViewController.handle);
videoRouter.post("/", ensureIsTeacher, videoCreateController.handle);
videoRouter.patch("/:video_id", ensureVideoExists, ensureIsTeacher, videoUpdateController.handle);
videoRouter.delete("/:video_id", ensureVideoExists, ensureIsTeacher, videoDeleteController.handle);


export { videoRouter };