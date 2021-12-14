import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";


describe("[PATCH] /users", () => {
    it("Should be able to change user email and name", async() => {
        const { STUDANT_AUTH, STUDANT_PAYLOAD } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .patch("/users")
                .set({authorization: STUDANT_AUTH})
                .send({
                    name: "John",
                    email: "john@gmail.com",
                })
                .expect(200)
            ).body
        ).toMatchObject({
            id: '',
            ...STUDANT_PAYLOAD,
            name: "John",
            email: "john@gmail.com"
        });

        variableContainer.STUDANT_PAYLOAD = response.body;
    });

    it("Should not be able to change user is_teacher", async() => {
        const { STUDANT_AUTH, STUDANT_PAYLOAD } = variableContainer;
        expect(
            (
                await request(app)
                .patch("/users")
                .set({authorization: STUDANT_AUTH})
                .send({
                    is_teacher: true
                })
                .expect(200)
            ).body
        ).toMatchObject({
            id: '',
            ...STUDANT_PAYLOAD,
            name: "John",
            email: "john@gmail.com"
        });

    });

    it("Should not be able to change informations if user is not authenticated", async() => {
        expect(
            (
                await request(app)
                .patch("/users")
                .send({
                    name: "Hackerman",
                    email: "Hackerman@hacker.com",
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });

    it("Should not be able to change email for a existing email", async() => {
        const { STUDANT_AUTH, TEACHER_PAYLOAD={} } = variableContainer;
        expect(
            (
                await request(app)
                .patch("/users")
                .set({authorization: STUDANT_AUTH})
                .send({
                    email: TEACHER_PAYLOAD["email"]
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "user_already_registered"
        });
    });


});
