import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[GET] /classes/:class_id/contents/posts", ()=>{
    it("Should be able to list posts as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST, TEACHER_CLASS_ANOTHER_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({ authorization: TEACHER_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_POST,
                TEACHER_CLASS_POST
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to list posts as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS,TEACHER_CLASS_POST,TEACHER_CLASS_ANOTHER_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_POST,
                TEACHER_CLASS_POST
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to filter list with query paramters", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_POST, TEACHER_CLASS_ANOTHER_POST } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts?name=john`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_POST,
                TEACHER_CLASS_POST
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
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts?description=${TEACHER_CLASS_POST.description}`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_POST
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
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts?page=2`)
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

    it("Should not be able to list posts if user not is authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/posts`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});