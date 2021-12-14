import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[GET] /classes/:class_id/contents/posts/:post_id", () => {
    it("Should be able to show class post as teacher", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject(TEACHER_CLASS_POST);
    });

    it("Should be able to show class post as user", async() => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: STUDANT_AUTH})
                .expect(200)
            ).body
        ).toMatchObject(TEACHER_CLASS_POST);
    });

    it("Should not able to show class post of a non existing class", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/0/contents/posts/${TEACHER_CLASS_POST.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not able to show class post of a non existing post", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts/0`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "post_not_found"
        });
    });

    it("Should be able to show class post if user is not authenticated", async() => {
        const { TEACHER_CLASS, TEACHER_CLASS_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts/${TEACHER_CLASS_POST.id}`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});