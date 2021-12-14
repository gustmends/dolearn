import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[DELETE] /classes/:class_id", () => {
    it("Should be able to delete class", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_ANOTHER_CLASS } = variableContainer;

        await request(app)
        .delete("/classes/" + TEACHER_ANOTHER_CLASS.id)
        .set({authorization: TEACHER_ANOTHER_AUTH})
        .expect(201)

        delete variableContainer.TEACHER_ANOTHER_CLASS;
    });

    it("Should not be able to delete class if not is teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .delete("/classes/" + TEACHER_CLASS.id)
                .set({authorization: STUDANT_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to delete others class as teacher", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .delete("/classes/" + TEACHER_CLASS.id)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "class_permission_denied"
        });
    });

    it("Should not be able to delete a non existing class", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .delete("/classes/0")
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to delete a class if user not is authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .delete("/classes/" + TEACHER_CLASS.id)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});