import request from "supertest";
import { app } from "../../src/https";
import { variableContainer } from "../variable_container";

describe("[GET] /classes/:class_id/contents", () => {
    it("Should be able to list class contents as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO, TEACHER_CLASS_POST, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents`)
                .set({authorization: TEACHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject({
            video_info: {
                total: 1,
                lasts: [TEACHER_CLASS_VIDEO]
            },
            file_info: {
                total: 1,
                lasts: [TEACHER_CLASS_FILE]
            },
            post_info: {
                total: 1,
                lasts: [TEACHER_CLASS_POST]
            }
        });
    });

    it("Should be able to list class contents as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO, TEACHER_CLASS_POST, TEACHER_CLASS_FILE } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents`)
                .set({authorization: STUDANT_AUTH})
                .expect(200)
            ).body
        ).toMatchObject({
            video_info: {
                total: 1,
                lasts: [TEACHER_CLASS_VIDEO]
            },
            file_info: {
                total: 1,
                lasts: [TEACHER_CLASS_FILE]
            },
            post_info: {
                total: 1,
                lasts: [TEACHER_CLASS_POST]
            }
        });
    });

    it("Should not be able to list class contents if user is not authenticated", async () => {
        const { TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });

});