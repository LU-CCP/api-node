const assert = require("assert");
const app = require("../app");
const supertest = require("../node_modules");

describe("post /medicamento", () => {
  it("It should has status code 200", done => {
    supertest(app)
      .get("/medicamento")
      .expect(200)
      .end(function(error, response) {
        if (error) {
          done(error);
        } else {
          done();
        }
      });
  });
});
