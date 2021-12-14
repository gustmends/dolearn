import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[POST] /classes/:class_id/contents/files", () => {
    it("Should be able to create class files", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's file",
                    link: "https://john.doe/file.doe",
                    description: "Just a secret file"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            name: "Secret john doe's file",
            link: "https://john.doe/file.doe",
            description: "Just a secret file",
            class_id: TEACHER_CLASS.id
        });

        variableContainer.TEACHER_CLASS_FILE = response.body;

        var response: request.Response;
        expect(
            (
                response = await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret another john doe's file",
                    link: "https://john.doe/anotherfile.doe",
                    description: "Just another secret file"
                })
                .expect(200)
            ).body
        ).toMatchObject({
            name: "Secret another john doe's file",
            link: "https://john.doe/anotherfile.doe",
            description: "Just another secret file",
            class_id: TEACHER_CLASS.id
        });

        variableContainer.TEACHER_CLASS_ANOTHER_FILE = response.body;
    });

    it("Should not be able to create class files if class not exists", async () => {
        const { TEACHER_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/0/contents/files`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's file",
                    link: "https://john.doe/file.doe",
                    description: "Just a secret file"
                })
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to create class files if user is not teacher", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: STUDANT_AUTH})
                .send({
                    name: "Secret studant's file",
                    link: "https://studant/file.studant",
                    description: "Just a secret file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to create class files if user is not owner", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .send({
                    name: "Secret another john doe's file",
                    link: "https://another.john.doe/file.anther",
                    description: "Just a secret file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "file_permission_denied"
        });
    });

    it("Should not be able to create class files with invalid inputs", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    link: "https://john.doe/file.doe",
                    description: "Just a secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "file_invalid_name"
        });

        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's file",
                    description: "Just a secret file"
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "file_invalid_link"
        });

        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({authorization: TEACHER_AUTH})
                .send({
                    name: "Secret john doe's file",
                    link: "https://john.doe/file.doe",
                })
                .expect(400)
            ).body
        ).toMatchObject({
            code: "file_invalid_description"
        });
    });

    it("Should not be able to create class files if user is not authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .post(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .send({
                    name: "Secret another john doe's file",
                    link: "https://another.john.doe/file.anther",
                    description: "Just a secret file"
                })
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});