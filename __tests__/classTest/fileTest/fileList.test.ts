import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[GET] /classes/:class_id/contents/files", ()=>{
    it("Should be able to list files as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE, TEACHER_CLASS_ANOTHER_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({ authorization: TEACHER_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_FILE,
                TEACHER_CLASS_FILE
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to list files as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS,TEACHER_CLASS_FILE,TEACHER_CLASS_ANOTHER_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_FILE,
                TEACHER_CLASS_FILE
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to filter list with query paramters", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_FILE, TEACHER_CLASS_ANOTHER_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files?name=john`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_FILE,
                TEACHER_CLASS_FILE
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
                .get(`/classes/${TEACHER_CLASS.id}/contents/files?description=${TEACHER_CLASS_FILE.description}`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_FILE
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
                .get(`/classes/${TEACHER_CLASS.id}/contents/files?page=2`)
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

    it("Should not be able to list files if user not is authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/files`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});