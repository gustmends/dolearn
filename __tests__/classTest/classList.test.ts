import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[GET] /classes", ()=>{
    it("Should be able to list classes as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_ANOTHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes")
                .set({ authorization: TEACHER_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_ANOTHER_CLASS,
                TEACHER_CLASS
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });


    it("Should be able to list classes as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_ANOTHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes")
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_ANOTHER_CLASS,
                TEACHER_CLASS
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to filter list with query paramters", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_ANOTHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get("/classes?name=" + TEACHER_ANOTHER_CLASS.name)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_ANOTHER_CLASS
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
                .get("/classes?discipline=" + TEACHER_CLASS.discipline)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS
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
                .get("/classes?matter=life")
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_ANOTHER_CLASS,
                TEACHER_CLASS
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });

        expect(
            (
                await request(app)
                .get("/classes?page=2")
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [],
            count: 0,
            page: 2,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should not be able to list classes if user not is authenticated", async () => {
        expect(
            (
                await request(app)
                .get("/classes")
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});