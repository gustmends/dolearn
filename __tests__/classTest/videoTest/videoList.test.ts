import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[GET] /classes/:class_id/contents/videos", ()=>{
    it("Should be able to list videos as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO, TEACHER_CLASS_ANOTHER_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({ authorization: TEACHER_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_VIDEO,
                TEACHER_CLASS_VIDEO
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to list videos as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS,TEACHER_CLASS_VIDEO,TEACHER_CLASS_ANOTHER_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_VIDEO,
                TEACHER_CLASS_VIDEO
            ],
            count: 2,
            page: 0,
            per_page: 20,
            total_page: 1,
            total: 2
        });
    });

    it("Should be able to filter list with query paramters", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO, TEACHER_CLASS_ANOTHER_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos?name=john`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_ANOTHER_VIDEO,
                TEACHER_CLASS_VIDEO
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
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos?description=${TEACHER_CLASS_VIDEO.description}`)
                .set({ authorization: STUDANT_AUTH })
                .expect(200)
            ).body
        ).toMatchObject({
            data: [
                TEACHER_CLASS_VIDEO
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
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos?page=2`)
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

    it("Should not be able to list videos if user not is authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});