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

  // async updateProduct(token, productId, payload) {
  //   const response = await chai
  //     .request(this.host)
  //     .put("/products/" + productId)
  //     .set("Authorization", "Bearer " + token)
  //     .set("Content-Type", this.header)
  //     .set("Accept", this.header)
  //     .send(payload);
  //   return response;
  // }

  // async deleteProduct(token, productId) {
  //   const response = await chai
  //     .request(this.host)
  //     .delete("/products/" + productId)
  //     .set("Authorization", "Bearer " + token)
  //     .set("Accept", this.header);
  //   return response;
  // }
}

module.exports = transactions;
