import { Router } from "express";
import { ensureIsTeacher } from "../../middlewares/ensureIsTeacher";
import { ensureFileExists } from "../../middlewares/ensureFileExists";
import { 
    fileCreateController,
    fileDeleteController,
    fileListController,
    fileUpdateController,
    fileViewController
} from "../../controllers/classController/fileController"

const fileRouter = Router();

fileRouter.get("/", fileListController.handle);
fileRouter.get("/:file_id", ensureFileExists, fileViewController.handle);
fileRouter.post("/", ensureIsTeacher, fileCreateController.handle);
fileRouter.patch("/:file_id", ensureFileExists, ensureIsTeacher, fileUpdateController.handle);
fileRouter.delete("/:file_id", ensureFileExists, ensureIsTeacher, fileDeleteController.handle);


export { fileRouter };