import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[PATCH] /classes/:class_id/contents/files/:file_id", () => {
    it("Should be able to change files setting in class", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated john doe's file",
                    link: "https://john.doe/updated/file.doe",
                    description: "Just a secret updated file"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            ...TEACHER_CLASS_FILE,
            name: "Secret updated john doe's file",
            link: "https://john.doe/updated/file.doe",
            description: "Just a secret updated file"
        });

        variableContainer.TEACHER_CLASS_FILE = response.body;
    });

    it("Should not be able to change files setting from others class", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .send({
                    name: "Secret updated another john doe's file",
                    link: "https://john.doe/another/file.doe",
                    description: "Just another secret updated file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "file_permission_denied"
        });
    });

    it("Should not be able to change files setting of a non existing files", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/0`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated not found's file",
                    link: "https://not.found/file.not",
                    description: "Just a not found secret file"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "file_not_found"
        });
    });

    it("Should not be able to change files setting of a non existing class", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/0/contents/files/0`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated not found's file",
                    link: "https://not.found/file.not",
                    description: "Just a not found secret file"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to change files setting with invalid paramters", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "-",
                    link: "https://invalid/file.inv",
                    description: "Just invalid secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "file_invalid_name"
        });

        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated invalid's file",
                    link: "-",
                    description: "Just invalid secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "file_invalid_link"
        });

        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated invalid's file",
                    link: "https://invalid/file.inv",
                    description: "-"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "file_invalid_description"
        });
    });

    it("Should not be able to change files setting from class if user is not teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: STUDANT_AUTH})
                .send({
                    name: "Secret updated studant's file",
                    link: "https://studant.stu/file.stu",
                    description: "Just secret updated file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to change files setting from class if user is not authenticated", async () => {
        const { TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .send({
                    name: "Secret updated authorization file",
                    link: "https://authorization.auth/authorization.auth",
                    description: "Just secret updated authorization file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});