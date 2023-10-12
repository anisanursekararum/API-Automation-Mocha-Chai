const chai = require("chai");
const { describe, it } = require("mocha");
const categories = require("../apis/categories.api");
const auth = require("../apis/auth.api");
const data = require("../../data/datas.json");
const message = require("../../data/messages.json");
const chaiSchema = require("chai-json-schema");
const expect = require("chai").expect;
chai.use(chaiSchema);

describe("TS Categories", () => {
  let token = "";
  let categoryId = "";

  before(async () => {
    const response = await new auth().login({
      email: data.email,
      password: data.password,
    });
    token = response.body.data.accessToken;
  });

  it("TC successfully add category", async () => {
    const response = await new categories().addCategories(token, {
      name: data.categoryName,
      description: data.categoryDesc,
    });
    categoryId = response.body.data.categoryId;
    expect(response.statusCode).to.be.equal(201);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successAddCategory);
    expect(response.body.data.name).to.be.equal(data.categoryName);
  });

  it("TC get detail category", async () => {
    const response = await new categories().getCategories(token, categoryId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.category.name).to.be.equal(data.categoryName);
    expect(response.body.data.category.description).to.be.equal(
      data.categoryDesc
    );
    expect(response.body).to.be.jsonSchema({
      $schema: "http://json-schema.org/draft-06/schema#",
      $ref: "#/definitions/Welcome1",
      definitions: {
        Welcome1: {
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
          title: "Welcome1",
        },
        Data: {
          type: "object",
          additionalProperties: false,
          properties: {
            category: {
              $ref: "#/definitions/Category",
            },
          },
          required: ["category"],
          title: "Data",
        },
        Category: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
          required: ["description", "name"],
          title: "Category",
        },
      },
    });
  });

  it("TC update category", async () => {
    const response = await new categories().updateCategories(
      token,
      categoryId,
      {
        name: data.categoryUpdate,
        description: data.categoryDesc,
      }
    );
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.name).to.be.equal(data.categoryUpdate);
  });

  it("TC delete category", async () => {
    const response = await new categories().deleteCategories(token, categoryId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
  });
});
