import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[GET] /users/classes", () => {
    it("Should be able to list user classes", async() => {
        const { TEACHER_AUTH, TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_ANOTHER_CLASS } = variableContainer;
        var { user, ...TEMP_TEACHER_CLASS } = TEACHER_CLASS;
        var { user, ...TEMP_TEACHER_ANOTHER_CLASS } = TEACHER_ANOTHER_CLASS;
        
        expect(
            (
                await request(app)
                .get("/users/classes")
                .set({authorization: TEACHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEMP_TEACHER_CLASS
            ],
            count: 1,
	        page: 0,
	        per_page: 20,
	        total_page: 1,
	        total: 1
        });

        expect(
            (
                await request(app)
                .get("/users/classes")
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEMP_TEACHER_ANOTHER_CLASS
            ],
            count: 1,
	        page: 0,
	        per_page: 20,
	        total_page: 1,
	        total: 1
        });
    });

    it("Should not be able to list user classes if user not is a teacher", async() => {
        const { STUDANT_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .get("/users/classes")
                .set({authorization: STUDANT_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to list user classes if user not is authenticated", async() => {
        expect(
            (
                await request(app)
                .get("/users/classes")
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });

});