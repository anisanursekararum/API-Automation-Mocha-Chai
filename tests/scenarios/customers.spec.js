const chai = require("chai");
const { describe, it } = require("mocha");
const customers = require("../apis/customers.api");
const auth = require("../apis/auth.api");
const data = require("../../data/datas.json");
const message = require("../../data/messages.json");
const chaiSchema = require("chai-json-schema");
const expect = require("chai").expect;
chai.use(chaiSchema);

describe("TS Customers", () => {
  let token = "";
  let customerId = "";

  before(async () => {
    const response = await new auth().login({
      email: data.email,
      password: data.password,
    });
    token = response.body.data.accessToken;
  });

  it("TC successfully add customer", async () => {
    const response = await new customers().addCustomer(token, {
      name: data.customerName,
      phone: data.customerPhone,
      address: data.customerAddress,
      description: data.customerDesc,
    });
    customerId = response.body.data.customerId;
    expect(response.statusCode).to.be.equal(201);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successAddCustomer);
    expect(response.body.data.name).to.be.equal(data.customerName);
  });

  it("TC get detail customer", async () => {
    const response = await new customers().getCustomer(token, customerId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.customer.name).to.be.equal(data.customerName);
    expect(response.body.data.customer.phone).to.be.equal(data.customerPhone);
    expect(response.body.data.customer.address).to.be.equal(data.customerAddress);
    expect(response.body.data.customer.description).to.be.equal(data.customerDesc);
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
            customer: {
              $ref: "#/definitions/Customer",
            },
          },
          required: ["customer"],
          title: "Data",
        },
        Customer: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            address: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
          required: ["address", "description", "name", "phone"],
          title: "Customer",
        },
      },
    });
  });

  it("TC update customer", async () => {
    const response = await new customers().updateCustomer(token, customerId, {
      name: data.customerNameUpdate,
      phone: data.customerPhoneUpdate,
      address: data.customerAddressUpdate,
      description: data.customerDescUpdate,
    });
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.name).to.be.equal(data.customerNameUpdate);
  });

  it("TC delete customer", async () => {
    const response = await new customers().deleteCustomer(token, customerId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
  });
});
