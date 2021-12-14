import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";



describe("[DELETE] /classes/:class_id/contents/posts/:post_id", () => {
    it("Should be able to delete class post as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_ANOTHER_POST } = variableContainer;
        await request(app)
        .delete(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_ANOTHER_POST.id}`)
        .set({authorization: TEACHER_AUTH})
        .expect(201)

        delete variableContainer.TEACHER_CLASS_ANOTHER_POST;
    });

    it("Should not be able to delete class post as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: STUDANT_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to delete others class posts", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "post_permission_denied"
        });
    });

    it("Should not be able to delete class post if post not exists", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/posts/0`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "post_not_found"
        });
    });

    it("Should not be able to delete class post if class not exists", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/0/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to delete class post is user is not authenticated", async () => {
        const { TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});