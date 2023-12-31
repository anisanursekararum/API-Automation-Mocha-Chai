const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");
const auth = require("../apis/auth.api");
const { login } = require("../../data/login.data");
const { registration } = require("../../data/registration.data");
const expect = require("chai").expect;
chai.use(chaiHttp);

describe("TS Authentication", () => {
  login.forEach((item) => {
    it(item.case.title, async () => {
      const response = await new auth().login(item.payload);
      expect(response.status).to.be.equal(item.case.status);
      expect(response.body.message).to.be.equal(item.case.message);
    });
  });

  registration.forEach((item) => {
    it(item.case.title, async () => {
      const response = await new auth().registration(item.payload);
      expect(response.status).to.be.equal(item.case.status);
      expect(response.body.message).to.be.equal(item.case.message);
    });
  });
});
