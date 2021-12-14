import { PostCreateController } from "./PostCreateController";
import { PostDeleteController } from "./PostDeleteController";
import { PostUpdateController } from "./PostUpdateController";
import { PostListController } from "./PostListController";
import { PostViewController } from "./PostViewController";

const postCreateController = new PostCreateController();
const postDeleteController = new PostDeleteController();
const postUpdateController = new PostUpdateController();
const postListController = new PostListController();
const postViewController = new PostViewController();


export {
    postCreateController,
    postDeleteController,
    postUpdateController,
    postListController,
    postViewController
};