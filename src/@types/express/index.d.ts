declare namespace Express {
    export interface Request {
        user: import(".prisma/client").User
        userClass: import(".prisma/client").Class
        userFile: import(".prisma/client").File
        userVideo: import(".prisma/client").Video
        userPost: import(".prisma/client").Post
    }
}