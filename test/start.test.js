const expect = require("chai").expect

it("should add two number properly", function () {
    const num1 = 10;
    const num2 = 5;
    expect(num1 + num2).to.equal(15)
})



// it("It should return the details about Register new user", function (done) {
//     chai
//       .request(server)
//       .post("/api/users/register")
    //   .send({ name: "Test2", email: "test2@gmail.com", password: "test2" })
//       .set("Content-Type", "application/json")
//       .set("accept", "application/json")
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body.email).not.to.be.equal(null);
//         done();
//       });
//   });