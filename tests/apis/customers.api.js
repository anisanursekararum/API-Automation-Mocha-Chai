const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("../../data/datas.json");
chai.use(chaiHttp);

class customers {
  constructor() {
    this.host = data.baseURL;
    this.header = data.header;
  }

  async addCustomer(token, payload) {
    const response = await chai
      .request(this.host)
      .post("/customers")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header)
      .send(payload);
    return response;
  }

  async getCustomer(token, customerId) {
    const response = await chai
      .request(this.host)
      .get("/customers/" + customerId)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header);
    return response;
  }

  async updateCustomer(token, customerId, payload) {
    const response = await chai
      .request(this.host)
      .put("/customers/" + customerId)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header)
      .send(payload);
    return response;
  }

  async deleteCustomer(token, customerId) {
    const response = await chai
      .request(this.host)
      .delete("/customers/" + customerId)
      .set("Authorization", "Bearer " + token)
      .set("Accept", this.header);
    return response;
  }
}

module.exports = customers;
