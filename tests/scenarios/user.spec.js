const chai = require("chai");
const { describe, it } = require("mocha");
const user = require("../apis/user.api");
const auth = require("../apis/auth.api");
const data = require("../../data/datas.json");
const message = require("../../data/messages.json");
const chaiSchema = require("chai-json-schema");
const expect = require("chai").expect;
chai.use(chaiSchema);

describe("TS User", () => {
  let token = "";
  let uniqueSeed = Date.now().toString();
  let userId = "";

  before(async () => {
    const response = await new auth().login({
      email: data.email,
      password: data.password,
    });
    token = response.body.data.accessToken;
  });

  it("TC successfully add user", async () => {
    allure.description("This is an post request for the module user");
    allure.severity(data.severityBlocker);
    allure.epic(data.epicCredentials);
    allure.feature(data.featurUser);
    allure.addArgument("Owner", data.owner);
    allure.addLabel("tag", data.tagUser);
    allure.addLabel("tag", data.serviceAPI);
    const response = await new user().addUser(token, {
      name: "user" + uniqueSeed,
      email: uniqueSeed + "user@gmail.com",
      password: "password",
    });
    userId = response.body.data.userId;
    expect(response.statusCode).to.be.equal(201);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successAddUser);
  });

  it("TC get detail user", async () => {
    allure.description("This is an get request for the module user");
    allure.severity(data.severityBlocker);
    allure.epic(data.epicCredentials);
    allure.feature(data.featurUser);
    allure.addArgument("Owner", data.owner);
    allure.addLabel("tag", data.tagUser);
    allure.addLabel("tag", data.serviceAPI);
    const response = await new user().getUser(token, userId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.be.jsonSchema({
      $schema: "http://json-schema.org/draft-06/schema#",
      $ref: "#/definitions/Welcome5",
      definitions: {
        Welcome5: {
          type: "object",
          additionalProperties: false,
          properties: {
            status: {
              type: "string",
            },
            data: {
              $ref: "#/definitions/Data",
            },
          },
          required: ["data", "status"],
          title: "Welcome5",
        },
        Data: {
          type: "object",
          additionalProperties: false,
          properties: {
            user: {
              $ref: "#/definitions/User",
            },
          },
          required: ["user"],
          title: "Data",
        },
        User: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            role: {
              type: "string",
            },
          },
          required: ["email", "id", "name", "role"],
          title: "User",
        },
      },
    });
  });

  it("TC update user", async () => {
    allure.description("This is an put request for the module user");
    allure.severity(data.severityBlocker);
    allure.epic(data.epicCredentials);
    allure.feature(data.featurUser);
    allure.addArgument("Owner", data.owner);
    allure.addLabel("tag", data.tagUser);
    allure.addLabel("tag", data.serviceAPI);
    const response = await new user().updateUser(token, userId, {
      name: data.nameUpdate,
      email: uniqueSeed + "userUpdate@gmail.com",
    });
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successUpdateUser);
    expect(response.body.data.name).to.be.equal(data.nameUpdate);
  });

  it("TC delete user", async () => {
    allure.description("This is an delete request for the module user");
    allure.severity(data.severityBlocker);
    allure.epic(data.epicCredentials);
    allure.feature(data.featurUser);
    allure.addArgument("Owner", data.owner);
    allure.addLabel("tag", data.tagUser);
    allure.addLabel("tag", data.serviceAPI);
    const response = await new user().deleteUser(token, userId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successDeleteUser);
  });
});
