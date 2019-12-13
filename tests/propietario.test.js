var assert = require("assert");
const app = require("..app.js");
const supertest = require("supertest");

const sumar = (a, b) => {
  return a + b;
};

describe("validar la suma", () => {
  it("la suma entre 5 y 5 debe dar 10", () => {
    assert.equal(10, sumar(5, 5));
  });
});

describe("GET /propietario", () => {
  it("it should has status code 200", done => {
    supertest(app)
      .get("/propietario/promise")
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        else done();
      });
  });
});
