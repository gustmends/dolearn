import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[PATCH] /classes/:class_id/contents/posts/:post_id", () => {
    it("Should be able to change posts setting in class", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret updated john doe's file",
                    description: "Just a secret updated file"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            ...TEACHER_CLASS_POST,
            title: "Secret updated john doe's file",
            description: "Just a secret updated file"
        });

        variableContainer.TEACHER_CLASS_POST = response.body;
    });

    it("Should not be able to change posts setting from others class", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .send({
                    title: "Secret updated another john doe's file",
                    description: "Just another secret updated file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "post_permission_denied"
        });
    });

    it("Should not be able to change posts setting of a non existing posts", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/0`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret updated not found's file",
                    description: "Just a not found secret file"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "post_not_found"
        });
    });

    it("Should not be able to change posts setting of a non existing class", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/0/contents/posts/0`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret updated not found's file",
                    description: "Just a not found secret file"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to change posts setting with invalid paramters", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "-",
                    description: "Just invalid secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "post_invalid_title"
        });

        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    title: "Secret updated invalid's file",
                    description: "-"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "post_invalid_description"
        });
    });

    it("Should not be able to change posts setting from class if user is not teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: STUDANT_AUTH})
                .send({
                    title: "Secret updated studant's file",
                    description: "Just secret updated file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to change posts setting from class if user is not authenticated", async () => {
        const { TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .patch(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .send({
                    title: "Secret updated authorization file",
                    description: "Just secret updated authorization file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});