import request from "supertest";
import { app } from "../../src/https";
import { verify } from "jsonwebtoken";
import { variableContainer } from "../variable_container";

describe("[POST] /users/login", ()=>{
    it("Should be able to login as studant", async () => {
        var response = await request(app)
        .post("/users/login")
        .send({
            email: "john.doe@gmail.com",
            password: "johndoe123"
        })
        .expect(200);
        var { token } = response.body;
        expect(token).not.toBeNull();
        expect(()=>verify(token, process.env.JWT_TOKEN)).not.toThrow();
        variableContainer.STUDANT_AUTH = 'Bearer ' + token;
    });

    it("Should be able to login as teacher", async () => {
        var response = await request(app)
        .post("/users/login")
        .send({
            email: "mrjohn.doe@gmail.com",
            password: "johndoe123"
        })
        .expect(200);
        var { token } = response.body;
        expect(token).not.toBeNull();
        expect(()=>verify(token, process.env.JWT_TOKEN)).not.toThrow();
        variableContainer.TEACHER_AUTH = 'Bearer ' + token;


        var response = await request(app)
        .post("/users/login")
        .send({
            email: "anothermrjohn.doe@gmail.com",
            password: "johndoe123"
        })
        .expect(200);
        var { token } = response.body;
        expect(token).not.toBeNull();
        expect(()=>verify(token, process.env.JWT_TOKEN)).not.toThrow();
        variableContainer.TEACHER_ANOTHER_AUTH = 'Bearer ' + token;
    });

    it("Should not able to login with invalid credentials", async () => {
        expect(
            (
                await request(app)
                .post("/users/login")
                .send({
                    email: "john.doe@gmail.com",
                    password: "johndoe"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "user_not_found"
        });
    });
});