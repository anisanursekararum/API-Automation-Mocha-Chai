const chai = require("chai");
const { describe, it } = require("mocha");
const unit = require("../apis/unit.api");
const auth = require("../apis/auth.api");
const data = require("../../data/datas.json");
const message = require("../../data/messages.json");
const chaiSchema = require("chai-json-schema");
const expect = require("chai").expect;
chai.use(chaiSchema);

describe("TS Unit", () => {
  let token = "";
  let unitId = "";

  before(async () => {
    const response = await new auth().login({
      email: data.email,
      password: data.password,
    });
    token = response.body.data.accessToken;
  });

  it("TC successfully add unit", async () => {
    const response = await new unit().addUnit(token, {
      name: data.unitName,
      description: data.unitDesc,
    });
    unitId = response.body.data.unitId;
    expect(response.statusCode).to.be.equal(201);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successAddUnit);
    expect(response.body.data.name).to.be.equal(data.unitName);
  });

  it("TC get detail unit", async () => {
    const response = await new unit().getUnit(token, unitId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.unit.name).to.be.equal(data.unitName);
    expect(response.body.data.unit.description).to.be.equal(data.unitDesc);
    expect(response.body).to.be.jsonSchema({
      $schema: "http://json-schema.org/draft-06/schema#",
      $ref: "#/definitions/Welcome4",
      definitions: {
        Welcome4: {
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
          title: "Welcome4",
        },
        Data: {
          type: "object",
          additionalProperties: false,
          properties: {
            unit: {
              $ref: "#/definitions/Unit",
            },
          },
          required: ["unit"],
          title: "Data",
        },
        Unit: {
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
          title: "Unit",
        },
      },
    });
  });

  it("TC update unit", async () => {
    const response = await new unit().updateUnit(token, unitId, {
      name: data.unitUpdate,
      description: data.unitDescUpdate,
    });
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.name).to.be.equal(data.unitUpdate);
  });

  it("TC delete unit", async () => {
    const response = await new unit().deleteUnit(token, unitId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
  });
});
