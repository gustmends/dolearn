import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[PATCH] /classes/:class_id", () => {
    it("Should be able to update class information if user is teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .patch("/classes/"+TEACHER_CLASS.id)
                .set({ authorization: TEACHER_AUTH })
                .send({
                    name: "john doe's EPIC class",
                    discipline: "john doe legend",
                    matter: "john doe EPIC life"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            ...TEACHER_CLASS,
            name: "john doe's EPIC class",
            discipline: "john doe legend",
            matter: "john doe EPIC life"
        });

        variableContainer.TEACHER_CLASS = response.body;
    });

    it("Should not be able to update class information if user is studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .patch("/classes/"+TEACHER_CLASS.id)
                .set({ authorization: STUDANT_AUTH })
                .send({
                    name: "studant's class",
                    discipline: "studant",
                    matter: "studant life"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to update class information if class not exists", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .patch("/classes/0")
                .set({ authorization: TEACHER_AUTH })
                .send({
                    name: "ghost's class",
                    discipline: "ghost",
                    matter: "ghost life"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to update class information if user not is authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .patch("/classes/" + TEACHER_CLASS.id)
                .send({
                    name: "authenticated's class",
                    discipline: "authenticated",
                    matter: "authenticated life",
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});