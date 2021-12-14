import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";

describe("[GET] /classes/:class_id/contents/videos/:video_id", () => {
    it("Should be able to show class video as teacher", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(200)
            ).body
        ).toMatchObject(TEACHER_CLASS_VIDEO);
    });

    it("Should be able to show class video as user", async() => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: STUDANT_AUTH})
                .expect(200)
            ).body
        ).toMatchObject(TEACHER_CLASS_VIDEO);
    });

    it("Should not able to show class video of a non existing class", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/0/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not able to show class video of a non existing video", async() => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos/0`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "video_not_found"
        });
    });

    it("Should be able to show class video if user is not authenticated", async() => {
        const { TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .get(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});