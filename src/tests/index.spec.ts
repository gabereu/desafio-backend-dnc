import request from "supertest";
import { server } from "../main/application/server";

describe("Teste server", () => {
    test("It should response /test path",async () => {
        const resposne = await request(server).get("/test");
        
        expect(resposne.statusCode).toEqual(200);
        expect(resposne.body).toStrictEqual({ message: "Hello World" });
    })
});