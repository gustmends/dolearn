import { VideoCreateController } from "./VideoCreateController";
import { VideoDeleteController } from "./VideoDeleteController";
import { VideoUpdateController } from "./VideoUpdateController";
import { VideoListController } from "./VideoListController";
import { VideoViewController } from "./VideoViewController";

const videoCreateController = new VideoCreateController();
const videoDeleteController = new VideoDeleteController();
const videoUpdateController = new VideoUpdateController();
const videoListController = new VideoListController();
const videoViewController = new VideoViewController();

export {
    videoCreateController,
    videoDeleteController,
    videoUpdateController,
    videoListController,
    videoViewController
};