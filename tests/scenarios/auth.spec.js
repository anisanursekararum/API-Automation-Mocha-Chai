const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");
const auth = require("../apis/auth.api");
const data = require("../../data/datas.json");
const { login } = require("../../data/login.data");
const { registration } = require("../../data/registration.data");
const expect = require("chai").expect;
chai.use(chaiHttp);

describe("TS Authentication", () => {
  login.forEach((item) => {
    it(item.case.title, async () => {
      allure.description(
        "This is an post request for the module auth register"
      );
      allure.severity(data.severityBlocker);
      allure.epic(data.epicCredentials);
      allure.feature(data.featureAuth);
      allure.addArgument("Owner", data.owner);
      allure.addLabel("tag", data.tagAuth);
      allure.addLabel("tag", data.serviceAPI);
      allure.addEnvironment("Environtment", data.envProd);
      allure.addEnvironment("BaseURL", data.baseURL);
      allure.addEnvironment("Service", data.serviceAPI);
      const response = await new auth().login(item.payload);
      expect(response.status).to.be.equal(item.case.status);
      expect(response.body.message).to.be.equal(item.case.message);
    });
  });

  registration.forEach((item) => {
    it(item.case.title, async () => {
      allure.description("This is an post request for the module auth login");
      allure.severity(data.severityBlocker);
      allure.epic(data.epicCredentials);
      allure.feature(data.featureAuth);
      allure.addArgument("Owner", data.owner);
      allure.addLabel("tag", data.tagAuth);
      allure.addLabel("tag", data.serviceAPI);
      const response = await new auth().registration(item.payload);
      expect(response.status).to.be.equal(item.case.status);
      expect(response.body.message).to.be.equal(item.case.message);
    });
  });
});
