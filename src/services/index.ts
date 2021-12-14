import { UserService } from "./UserService";
import { ClassService } from "./ClassService";
import { FileService } from "./FileService";
import { VideoService } from "./VideoService";
import { PostService } from "./PostService";
import { JwtService } from "./JwtService";

const userService = new UserService();
const classService = new ClassService();
const fileService = new FileService();
const videoService = new VideoService();
const postService = new PostService();
const jwtService = new JwtService(process.env.JWT_TOKEN);

export {
    userService,
    classService,
    fileService,
    videoService,
    postService,
    jwtService
};