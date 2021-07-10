process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const server = require("../index");
const crypto = require("crypto");
chai.should();
chai.use(chaiHttp);

describe("Kanban API", () => {
  // ========================================================================= //

  const user1Credential = {
    email: "user1@gmail.com",
    password: "user1",
  };
  const user3Credential = {
    email: "user3@gmail.com",
    password: "user3",
  };
  let tokenUser1, tokenUser3;
  before((done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(user1Credential)
      .end((err, response) => {
        tokenUser1 = response.body.access_token;
      });
    chai
      .request(server)
      .post("/user/login")
      .send(user3Credential)
      .end((err, response) => {
        tokenUser3 = response.body.access_token;
        done();
      });
  });

  // ========================================================================= //

  // Registration with already used email
  describe("POST /user/register wih already used email", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user1@gmail.com",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Email is not unique");
          done();
        });
    });
  });

  // Registration without email
  describe("POST /user/register without emaild data provided", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("User.email cannot be null");
          done();
        });
    });
  });

  // Registration with empty email
  describe("POST /user/register with empty email", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes(
              "Validation notEmpty on email failed",
              "Validation isEmail on email failed"
            );
          done();
        });
    });
  });

  // Registration with invalid email format
  describe("POST /user/register with invalid email format", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "abc",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Validation isEmail on email failed");
          done();
        });
    });
  });

  // Registration with empty password
  describe("POST /user/register with empty password", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user5@gmail.com",
          password: "",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Validation notEmpty on password failed");
          done();
        });
    });
  });

  // ========================================================================= //

  // Testing Authenticated and Authorized User

  // Get all tasks
  describe("GET /task", () => {
    it("should get all tasks", (done) => {
      chai
        .request(server)
        .get("/task")
        .set("access_token", tokenUser1)
        .end((_, response) => {console.log(response.body)
          ids = response.body.map((res) => res.id);
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          ids.should.have.members([1, 2, 3]);
          done();
        });
    });
  });

  // Get certain task
  describe("GET /task/1", () => {
    it("should get certain task", (done) => {
      chai
        .request(server)
        .get("/task/1")
        .set("access_token", tokenUser1)
        .end((_, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          done();
        });
    });
  });

  // Create task without title
  describe("POST /task without title", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          description: "Example Description",
          priority: "high",
          category: "in progress",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Task.title cannot be null");
          done();
        });
    });
  });

  // Create task with empty title
  describe("POST /task with empty title", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "",
          description: "Example Description",
          priority: "high",
          category: "in progress",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation notEmpty on title failed");
          done();
        });
    });
  });

  // Create task with more than 100 characters
  describe("POST /task with title more than 100 characters", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: crypto.randomBytes(110).toString("hex"),
          description: "Example Description",
          priority: "high",
          category: "in progress",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Title's length cant be more than 100 characters");
          done();
        });
    });
  });

  // Create task with description more than 500 characters
  describe("POST /task with title more than 100 characters", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: crypto.randomBytes(510).toString("hex"),
          priority: "high",
          category: "in progress",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes(
              "Description's length cant be more than 500 characters"
            );
          done();
        });
    });
  });

  // Create task without priority
  describe("POST /task without status", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          category: "in progress",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Task.priority cannot be null");
          done();
        });
    });
  });

  // Create task with priority not in ["high","medium","low"]
  describe("POST /task with status not in ['high', 'medium', 'low']", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "very high",
          category: "in progress",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation isIn on priority failed");
          done();
        });
    });
  });

  // Create task without category
  describe("POST /task without status", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "high",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Task.category cannot be null");
          done();
        });
    });
  });

  // Create task with category not in ["backlog", "todo", "in progress", "done"]
  describe("POST /task with status not in ['backlog', 'todo', 'in progress', 'done']", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "high",
          category: "finished",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation isIn on category failed");
          done();
        });
    });
  });

  // Create task without due date
  describe("POST /task without due date", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "high",
          category: "done",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Task.due_date cannot be null");
          done();
        });
    });
  });

  // Create task with empty due date
  describe("POST /task with empty due date", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "high",
          category: "done",
          due_date: "",
        })
        .end((err, response) => {
          console.log(response)
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .eql([
              "Input the date and time format string (YYYY-MM-DD hh:mm:ss)",
              "Validation notEmpty on due_date failed",
            ]);
          done();
        });
    });
  });

  // Create task with invalid date time string format due date
  describe("POST /task with invalid date time string format due date", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "high",
          category: "done",
          due_date: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .eql([
              "Input the date and time format string (YYYY-MM-DD hh:mm:ss)",
            ]);
          done();
        });
    });
  });

  // Create task with due date less than current time
  describe("POST /task with with due date less than current time", () => {
    it("should not create new task", (done) => {
      chai
        .request(server)
        .post("/task")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
          description: "Example",
          priority: "high",
          category: "done",
          due_date: "2021-06-03 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .eql(["Due datetime can't be less than current datetime"]);
          done();
        });
    });
  });

  // Patch task
  describe("PATCH /task", () => {
    it("should patch task", (done) => {
      chai
        .request(server)
        .patch("/task/1")
        .set("access_token", tokenUser1)
        .send({
          title: "Example example",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("title").eq("Example example");
          done();
        });
    });
  });

  // Put a task
  describe("PUT /task", () => {
    it("should put a task", (done) => {
      chai
        .request(server)
        .put("/task/1")
        .set("access_token", tokenUser1)
        .send({
          title: "Examples",
          description: "Examples",
          priority: "high",
          category: "done",
          due_date: "2021-08-31 00:00:00",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("title").eq("Examples");
          response.body.should.have.property("description").eq("Examples");
          response.body.should.have.property("priority").eq("high");
          response.body.should.have.property("category").eq("done");
          response.body.should.have
            .property("due_date")
            .eq("2021-08-31T00:00:00.000Z");
          done();
        });
    });
  });

  // Put task with incomplete data
  describe("PUT /task with incomplete data", () => {
    it("should not put task", (done) => {
      chai
        .request(server)
        .put("/task/1")
        .set("access_token", tokenUser1)
        .send({
          title: "Example",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eql([
              "All data (title, description, status, and due date) must be provided",
            ]);
          done();
        });
    });
  });

  // ========================================================================= //

  // Testing for unauthorized account

  // Delete a task for account which has 0 task list
  describe("DELETE /task for unauthorized task", () => {
    it("should not delete the selected task", (done) => {
      chai
        .request(server)
        .delete("/task/1")
        .set("access_token", tokenUser3)
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.a("object");
          response.body.should.have
            .property("error")
            .eql(["Task with id 1 is not found / authorized"]);
          done();
        });
    });
  });

  // ========================================================================= //

  // Testing for unauthenticated account

  // Get all task without token
  describe("GET /task for unauthenticated account", () => {
    it("should not get task", (done) => {
      chai
        .request(server)
        .get("/task/1")
        .end((err, response) => {
          response.should.have.status(401);
          response.should.be.a("object");
          response.body.should.have
            .property("error")
            .eql(["Token is not exist or invalid token"]);
          done();
        });
    });
  });
});
