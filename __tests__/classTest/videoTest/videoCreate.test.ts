import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[POST] /classes/:class_id/contents/videos", () => {
    it("Should be able to create class videos", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's video",
                    link: "https://john.doe/video.doe",
                    description: "Just a secret video"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            name: "Secret john doe's video",
            link: "https://john.doe/video.doe",
            description: "Just a secret video",
            class_id: TEACHER_CLASS.id
        });

        variableContainer.TEACHER_CLASS_VIDEO = response.body;

        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret another john doe's video",
                    link: "https://john.doe/anothervideo.doe",
                    description: "Just another secret video"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            name: "Secret another john doe's video",
            link: "https://john.doe/anothervideo.doe",
            description: "Just another secret video",
            class_id: TEACHER_CLASS.id
        });

        variableContainer.TEACHER_CLASS_ANOTHER_VIDEO = response.body;
    });

    it("Should not be able to create class videos if class not exists", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/0/contents/videos`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's video",
                    link: "https://john.doe/video.doe",
                    description: "Just a secret video"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to create class videos if user is not teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: STUDANT_AUTH})
                .send({
                    name: "Secret studant's video",
                    link: "https://studant/video.studant",
                    description: "Just a secret video"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to create class videos if user is not owner", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .send({
                    name: "Secret another john doe's video",
                    link: "https://another.john.doe/video.anther",
                    description: "Just a secret video"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "video_permission_denied"
        });
    });

    it("Should be able to create class videos", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    link: "https://john.doe/video.doe",
                    description: "Just a secret video"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "video_invalid_name"
        });

        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's video",
                    description: "Just a secret video"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "video_invalid_link"
        });

        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's video",
                    link: "https://john.doe/video.doe"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "video_invalid_description"
        });
    });

    it("Should not be able to create class videos if user is not authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .send({
                    name: "Secret another john doe's video",
                    link: "https://another.john.doe/video.anther",
                    description: "Just a secret video"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});