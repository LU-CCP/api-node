const assert = require('assert');
const app = require('../app.js');
const supertest = require('supertest');

describe("GET /paciente", () => {
    it("it should has status code 200", (done) => {
        supertest(app)
            .get("/paciente")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                else done();
            });
    });

    it("it should has status code 200", (done) => {
        supertest(app)
            .get("/paciente/kasdjahds")
            .expect(404)
            .end(function (err, res) {
                if (err) done(err);
                else done();
            });
    });
});

