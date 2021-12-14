import { FileCreateController } from "./FileCreateController";
import { FileDeleteController } from "./FileDeleteController";
import { FileUpdateController } from "./FileUpdateController";
import { FileListController } from "./FileListController";
import { FileViewController } from "./FileViewController";

const fileCreateController = new FileCreateController();
const fileDeleteController = new FileDeleteController();
const fileUpdateController = new FileUpdateController();
const fileListController = new FileListController();
const fileViewController = new FileViewController();


export {
    fileCreateController,
    fileDeleteController,
    fileUpdateController,
    fileListController,
    fileViewController
};