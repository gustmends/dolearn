import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[GET] /classes/:class_id/contents/files/:file_id", () => {
    it("Should be able to show class file as teacher", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject(TEACHER_CLASS_FILE);
    });

    it("Should be able to show class file as user", async() => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: STUDANT_AUTH})
                .expect(200)
            ).body
        ).toMatchObject(TEACHER_CLASS_FILE);
    });

    it("Should not able to show class file of a non existing class", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/0/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not able to show class file of a non existing file", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files/0`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "file_not_found"
        });
    });

    it("Should be able to show class file if user is not authenticated", async() => {
        const { TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});