import { ClassCreateController } from "./ClassCreateController";
import { ClassDeleteController } from "./ClassDeleteController";
import { ClassListContentsController } from "./ClassListContentsController";
import { ClassListController } from "./ClassListController";
import { ClassUpdateController } from "./ClassUpdateController";
import { ClassViewController } from "./ClassViewController";

const classCreateController = new ClassCreateController();
const classDeleteController = new ClassDeleteController();
const classListContentsController = new ClassListContentsController();
const classListController = new ClassListController();
const classUpdateController = new ClassUpdateController();
const classViewController = new ClassViewController();


export {
    classCreateController,
    classDeleteController,
    classListContentsController,
    classListController,
    classUpdateController,
    classViewController
};