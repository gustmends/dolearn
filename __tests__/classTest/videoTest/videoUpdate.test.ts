import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[PATCH] /classes/:class_id/contents/videos/:video_id", () => {
    it("Should be able to change videos setting in class", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated john doe's file",
                    link: "https://john.doe/updated/file.doe",
                    description: "Just a secret updated file"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            ...TEACHER_CLASS_VIDEO,
            name: "Secret updated john doe's file",
            link: "https://john.doe/updated/file.doe",
            description: "Just a secret updated file"
        });

        variableContainer.TEACHER_CLASS_VIDEO = response.body;
    });

    it("Should not be able to change videos setting from others class", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .send({
                    name: "Secret updated another john doe's file",
                    link: "https://john.doe/another/file.doe",
                    description: "Just another secret updated file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "video_permission_denied"
        });
    });

    it("Should not be able to change videos setting of a non existing videos", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/0`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated not found's file",
                    link: "https://not.found/file.not",
                    description: "Just a not found secret file"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "video_not_found"
        });
    });

    it("Should not be able to change videos setting of a non existing class", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/0/contents/videos/0`)
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

    it("Should not be able to change videos setting with invalid paramters", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "-",
                    link: "https://invalid/file.inv",
                    description: "Just invalid secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "video_invalid_name"
        });

        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated invalid's file",
                    link: "-",
                    description: "Just invalid secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "video_invalid_link"
        });

        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret updated invalid's file",
                    link: "https://invalid/file.inv",
                    description: "-"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "video_invalid_description"
        });
    });

    it("Should not be able to change videos setting from class if user is not teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
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

    it("Should not be able to change videos setting from class if user is not authenticated", async () => {
        const { TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
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