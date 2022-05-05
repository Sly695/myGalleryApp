var app = require("./app")
var request = require("supertest")

test("test", async () => {
    await request(app).post("/test")
        .expect(200)
        .expect({ result: true })
})