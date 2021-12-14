import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[GET] /classes/:class_id", () => {
    it("Should be able to view class informations as teacher", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes/" + TEACHER_CLASS.id)
                .set({authorization: TEACHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject({
            ...TEACHER_CLASS,
            posts: 0,
	        files: 0,
	        videos: 0
        });
    });

    it("Should be able to view class informations as studant", async() => {
        const { STUDANT_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes/" + TEACHER_CLASS.id)
                .set({authorization: STUDANT_AUTH})
                .expect(200)
            ).body
        ).toMatchObject({
            ...TEACHER_CLASS,
            posts: 0,
	        files: 0,
	        videos: 0
        });
    });

    it("Should not be able to view class informations if class not exists", async() => {
        const { STUDANT_AUTH } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes/0")
                .set({authorization: STUDANT_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to view class informations if user not is authenticated", async() => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes/" + TEACHER_CLASS.id)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});