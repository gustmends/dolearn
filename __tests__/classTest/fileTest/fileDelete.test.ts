import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";



describe("[DELETE] /classes/:class_id/contents/files/:file_id", () => {
    it("Should be able to delete class file as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_ANOTHER_FILE } = variableContainer;
        await request(app)
        .delete(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_ANOTHER_FILE.id}`)
        .set({authorization: TEACHER_AUTH})
        .expect(201)

        delete variableContainer.TEACHER_CLASS_ANOTHER_FILE;
    });

    it("Should not be able to delete class file as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: STUDANT_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to delete others class files", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "file_permission_denied"
        });
    });

    it("Should not be able to delete class file if file not exists", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/files/0`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "file_not_found"
        });
    });

    it("Should not be able to delete class file if class not exists", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/0/contents/files/${TEACHER_CLASS_FILE.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to delete class file is user is not authenticated", async () => {
        const { TEACHER_CLASS, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/files/${TEACHER_CLASS_FILE.id}`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});