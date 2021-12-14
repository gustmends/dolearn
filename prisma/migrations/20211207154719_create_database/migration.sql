-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_teacher" BOOLEAN DEFAULT false,
    "created_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "matter" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "classes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "created_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "class_id" TEXT NOT NULL,
    "created_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "files_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "class_id" TEXT NOT NULL,
    "created_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "videos_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
