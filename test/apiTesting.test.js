const chai = require("chai");
const expect = chai.expect;
const validateToken = require("../Middleware/validateTokenHandler");
const { getContacts } = require("../Controllers/contactController");
const server = require("../server");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpZCI6IjY1OWI5ZjU4MGJlMDg2OWYxNTVhYWZhMiJ9LCJpYXQiOjE3MDQ3NzU2MDQsImV4cCI6MTcwNDg2MjAwNH0.IPPm4Q2NUXW9c3f90oNnIs0VK0IvbHVy3hJeVHYVG-8";

describe("Contact Routes API TEST : ", function () {
  it("It should test conditions of getContacts API", async function () {
    let res = await chai
      .request(server)
      .get("/api/contacts/getContacts")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpZCI6IjY1OWI5ZjU4MGJlMDg2OWYxNTVhYWZhMiJ9LCJpYXQiOjE3MDQ3NzU2MDQsImV4cCI6MTcwNDg2MjAwNH0.IPPm4Q2NUXW9c3f90oNnIs0VK0IvbHVy3hJeVHYVG-8"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
  });

  it("It should test conditions of getContact API", async function () {
    let res = await chai
      .request(server)
      .get("/api/contacts/659bc6517ff023594575d7af")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpZCI6IjY1OWI5ZjU4MGJlMDg2OWYxNTVhYWZhMiJ9LCJpYXQiOjE3MDQ3NzU2MDQsImV4cCI6MTcwNDg2MjAwNH0.IPPm4Q2NUXW9c3f90oNnIs0VK0IvbHVy3hJeVHYVG-8"
      )
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res).to.have.status(200);
      });
  });

  it("It should test conditions of createContact API ", async function () {
    const res = await chai
      .request(server)
      .post("/api/contacts")
      .send({
        name: "Ethan Hunt",
        email: "ethan@gmail.com",
        phone: "1234567890",
      })
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  it("It should test conditions of updateContact API", async function () {
    await chai
      .request(server)
      .put("/api/contacts/659cdf34c8f20e2a5b90aeb4")
      .send({ name: "Rohit", email: "rohit@gmail.com" })
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
      });
  });
  it("It should test conditions of deleteContact API", async function () {
    await chai
      .request(server)
      .delete("/api/contacts/659d254550848241def5cd98")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.acknowledged).to.be.true;
      });
  });
});

describe("User Routes API Test", function () {
  it("It should test condions of registerUser API", async function () {
    await chai
      .request(server)
      .post("/api/users/register")
      .send({
        name: "Test3",
        email: "test3@gmail.com",
        password: "test3",
      })
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("_id");
      });
  });

  it("It should test conditions of loginUser API", async function () {
    await chai
      .request(server)
      .post("/api/users/login")
      .send({ email: "satya@gmail.com", password: "satya" })
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.accessToken).to.be.a("string");
      });
  });

  it("It should test conditions of currentUser API", async function () {
    await chai
      .request(server)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.all.keys("username", "email", "id");
      });
  });

  it("It should test conditions od updateUser API", async function () {
    await chai
      .request(server)
      .put("/api/users/update/659cd3c41d210c5f8b519d60")
      .send({ name: "Steve", email: "steve@gmail.com", password: "steve" })
      .set("Content-Type", "application/json")
      .set("accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdDIiLCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImlkIjoiNjU5Y2QzYzQxZDIxMGM1ZjhiNTE5ZDYwIn0sImlhdCI6MTcwNDc5NzE5MywiZXhwIjoxNzA0ODgzNTkzfQ.dU1omSp9QguVxt7aVcKgC_n4h4m3NfkspuG90NXy23I"
    )
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an("object")
    })
  });
});
