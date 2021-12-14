import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";


describe("[POST] /classes", () => {
    it("Should be able to create classes", async() => {
        const { TEACHER_AUTH, TEACHER_ANOTHER_AUTH, TEACHER_PAYLOAD, TEACHER_ANOTHER_PAYLOAD } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post("/classes")
                .set({authorization: TEACHER_AUTH })
                .send({
                    name: "john doe's class",
                    discipline: "john doe",
                    matter: "john doe life"
                })
                .expect(201)
            ).body
        ).toMatchObject({
            name: "john doe's class",
            discipline: "john doe",
            matter: "john doe life",
            user: TEACHER_PAYLOAD
        });
        variableContainer.TEACHER_CLASS = response.body;

        expect(
            (
                response = await request(app)
                .post("/classes")
                .set({authorization: TEACHER_ANOTHER_AUTH })
                .send({
                    name: "doe john's class",
                    discipline: "doe john",
                    matter: "doe john life"
                })
                .expect(201)
            ).body
        ).toMatchObject({
            name: "doe john's class",
            discipline: "doe john",
            matter: "doe john life",
            user: TEACHER_ANOTHER_PAYLOAD
        });

        variableContainer.TEACHER_ANOTHER_CLASS = response.body;

    });

    it("Should not be able to create classes if user is not a teatcher", async() => {
        const { STUDANT_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .post("/classes")
                .set({authorization: STUDANT_AUTH })
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

    it("Should not be able to create classes if post paramters is not setted", async() => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .post("/classes")
                .set({authorization: TEACHER_AUTH })
                .send({
                    discipline: "invalid",
                    matter: "invalid life"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "class_invalid_name"
        });

        expect(
            (
                await request(app)
                .post("/classes")
                .set({authorization: TEACHER_AUTH })
                .send({
                    name: "invalid's class",
                    matter: "invalid life"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "class_invalid_discipline"
        });

        expect(
            (
                await request(app)
                .post("/classes")
                .set({authorization: TEACHER_AUTH })
                .send({
                    name: "invalid's class",
                    discipline: "invalid"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "class_invalid_matter"
        });
    });

    it("Should not be able to create classes if user not is authenticated", async() => {
        expect(
            (
                await request(app)
                .post("/classes")
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