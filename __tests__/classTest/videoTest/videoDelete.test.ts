import request from "supertest";
import { app } from "../../../src/https";
import { variableContainer } from "../../variable_container";



describe("[DELETE] /classes/:class_id/contents/videos/:video_id", () => {
    it("Should be able to delete class video as teacher", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_ANOTHER_VIDEO } = variableContainer;
        await request(app)
        .delete(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_ANOTHER_VIDEO.id}`)
        .set({authorization: TEACHER_AUTH})
        .expect(201)

        delete variableContainer.TEACHER_CLASS_ANOTHER_VIDEO;
    });

    it("Should not be able to delete class video as studant", async () => {
        const { STUDANT_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: STUDANT_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_teacher"
        });
    });

    it("Should not be able to delete others class videos", async () => {
        const { TEACHER_ANOTHER_AUTH, TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_ANOTHER_AUTH})
                .expect(401)
            ).body
        ).toMatchObject({
            code: "video_permission_denied"
        });
    });

    it("Should not be able to delete class video if video not exists", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/videos/0`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "video_not_found"
        });
    });

    it("Should not be able to delete class video if class not exists", async () => {
        const { TEACHER_AUTH, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/0/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .set({authorization: TEACHER_AUTH})
                .expect(404)
            ).body
        ).toMatchObject({
            code: "class_not_found"
        });
    });

    it("Should not be able to delete class video is user is not authenticated", async () => {
        const { TEACHER_CLASS, TEACHER_CLASS_VIDEO } = variableContainer;
        expect(
            (
                await request(app)
                .delete(`/classes/${TEACHER_CLASS.id}/contents/videos/${TEACHER_CLASS_VIDEO.id}`)
                .expect(401)
            ).body
        ).toMatchObject({
            code: "user_not_authenticated"
        });
    });
});