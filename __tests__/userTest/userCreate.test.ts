import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[POST] /users", ()=>{
    it("Should be able to create new users as studant", async () => {
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post("/users")
                .send({
                    name: "John Doe",
                    email: "john.doe@gmail.com",
                    password: "johndoe123"
                })
                .expect(201)
            ).body
        ).toMatchObject({
            name: "John Doe",
            email: "john.doe@gmail.com",
            is_teacher: false
        });

        variableContainer.STUDANT_PAYLOAD = response.body;
    });

    it("Should be able to create new users as teacher", async () => {
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post("/users")
                .send({
                    name: "John Doe",
                    email: "mrjohn.doe@gmail.com",
                    password: "johndoe123",
                    is_teacher: true
                })
                .expect(201)
            ).body
        ).toMatchObject({
            name: "John Doe",
            email: "mrjohn.doe@gmail.com",
            is_teacher: true
        });

        variableContainer.TEACHER_PAYLOAD = response.body;

        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post("/users")
                .send({
                    name: "Another John Doe",
                    email: "anothermrjohn.doe@gmail.com",
                    password: "johndoe123",
                    is_teacher: true
                })
                .expect(201)
            ).body
        ).toMatchObject({
            name: "Another John Doe",
            email: "anothermrjohn.doe@gmail.com",
            is_teacher: true
        });

        variableContainer.TEACHER_ANOTHER_PAYLOAD = response.body;
    });

    it("Should not be able to create new users when email is already taken", async () => {
        expect(
            (
                await request(app)
                .post("/users")
                .send({
                    name: "John Doe",
                    email: "john.doe@gmail.com",
                    password: "johndoe123"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "user_already_registered"
        });
    });

    it("Should not be able to create new users when name, email or password not is setted", async () => {
        expect(
            (
                await request(app)
                .post("/users")
                .send({
                    email: "doe.john@gmail.com",
                    password: "johndoe123"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "user_invalid_name"
        });

        expect(
            (
                await request(app)
                .post("/users")
                .send({
                    name: "Doe John",
                    password: "johndoe123"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "user_invalid_email"
        });

        expect(
            (
                await request(app)
                .post("/users")
                .send({
                    name: "Doe John",
                    email: "doe.john@gmail.com",
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "user_invalid_password"
        });
    });
});