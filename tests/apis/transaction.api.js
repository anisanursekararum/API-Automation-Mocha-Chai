const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("../../data/datas.json");
chai.use(chaiHttp);

class transactions {
  constructor() {
    this.host = data.baseURL;
    this.header = data.header;
  }

  async addSale(token, payload) {
    const response = await chai
      .request(this.host)
      .post("/sales")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header)
      .send(payload);
    return response;
  }

  async getSale(token, saleId) {
    const response = await chai
      .request(this.host)
      .get("/sales/" + saleId)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header);
    return response;
  }

  async addPurchase(token, payload) {
    const response = await chai
      .request(this.host)
      .post("/purchases")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header)
      .send(payload);
    return response;
  }

  async getPurchase(token, purchaseId) {
    const response = await chai
      .request(this.host)
      .get("/purchases/" + purchaseId)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header);
    return response;
  }
}

module.exports = transactions;
