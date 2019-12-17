const assert = require("assert");
const app = require("../app.js");
const supertest = require("supertest");

// Rutas para paciente que se busca por id
describe("GET /paciente/id", () => {
  it("Paciente encontrado con éxito (code 200)", done => {
    supertest(app)
      .get("/paciente/1")
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });
  it("Paciente no encontrado (code 404)", done => {
    supertest(app)
      .get("/paciente/45")
      .expect(404)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });
});

// Rutas para paciente que se busca por sus propiedades
describe("GET /paciente/property", () => {
  it("Paciente encontrado con éxito (code 200)", done => {
    supertest(app)
      .get("/paciente/1")
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });
  it("Paciente no encontrado (code 404)", done => {
    supertest(app)
      .get("/paciente/nombre/asdf")
      .expect(404)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });
});

// Rutas para agregar un nuevo paciente
describe("POST /paciente", () => {
  it("Paciente agregado (code 201)", done => {
    supertest(app)
      .post("/paciente")
      .send({
        nombre: "Drogon",
        raza: "Volador",
        especie: "Dragón",
        id_propietario: "1",
        sexo: true,
        fecha_nacimiento: "2010-01-01"
      })
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it("Paciente no agregado (code 404)", done => {
    supertest(app)
      .post("/paciente")
      .send({
        nombre: "Drogon",
        raza: "Volador",
        especie: "Dragón",
        id_propietario: "100",
        sexo: true,
        fecha_nacimiento: "2010-01-01"
      })
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

// Rutas para editar un paciente
describe("PUT /paciente", () => {
  it("Paciente actualizado (code 201)", done => {
    supertest(app)
      .put("/paciente/12")
      .send({
        nombre: "Drogoncito",
        raza: "Volador",
        especie: "Dragón",
        id_propietario: "1",
        sexo: true,
        fecha_nacimiento: "2010-01-01"
      })
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it("Paciente no actualizado (code 404)", done => {
    supertest(app)
      .put("/paciente/120")
      .send({
        nombre: "Drogoncito",
        raza: "Volador",
        especie: "Dragón",
        id_propietario: "100",
        sexo: true,
        fecha_nacimiento: "2010-01-01"
      })
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

// Rutas para eliminar un paciente
describe("DELETE /paciente/id", () => {
  it("Paciente eliminado con éxito (code 200)", done => {
    supertest(app)
      .delete("/paciente/8")
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });
  it("Paciente no eliminado (code 404)", done => {
    supertest(app)
      .delete("/paciente/nombre/45")
      .expect(404)
      .end(function(err, res) {
        if (err) done(err);
        else done();
      });
  });
});
