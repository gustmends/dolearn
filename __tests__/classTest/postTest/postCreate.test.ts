import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[POST] /classes/:class_id/contents/posts", () => {
    it("Should be able to create class posts", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret john doe's post",
                    description: "Just a secret post"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            title: "Secret john doe's post",
            description: "Just a secret post",
            class_id: TEACHER_CLASS.id
        });

        variableContainer.TEACHER_CLASS_POST = response.body;

        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret another john doe's post",
                    description: "Just another secret post"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            title: "Secret another john doe's post",
            description: "Just another secret post",
            class_id: TEACHER_CLASS.id
        });

        variableContainer.TEACHER_CLASS_ANOTHER_POST = response.body;
    });

    it("Should not be able to create class posts if class not exists", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/0/contents/posts`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret john doe's post",
                    description: "Just a secret post"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to create class posts if user is not teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({authorization: STUDANT_AUTH})
                .send({
                    title: "Secret studant's post",
                    description: "Just a secret post"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to create class posts if user is not owner", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .send({
                    title: "Secret another john doe's post",
                    description: "Just a secret post"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "post_permission_denied"
        });
    });
    
    it("Should be able to create class posts", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    description: "Just a secret post"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "post_invalid_title"
        });

        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret john doe's post"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "post_invalid_description"
        });
    });

    it("Should not be able to create class posts if user is not authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .send({
                    title: "Secret another john doe's post",
                    description: "Just a secret post"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});