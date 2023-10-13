const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("../../data/datas.json");
chai.use(chaiHttp);

class unit {
  constructor() {
    this.host = data.baseURL;
    this.header = data.header;
  }

  async addUnit(token, payload) {
    const response = await chai
      .request(this.host)
      .post("/units")
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header)
      .send(payload);
    return response;
  }

  async getUnit(token, unitId) {
    const response = await chai
      .request(this.host)
      .get("/units/" + unitId)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header);
    return response;
  }

  async updateUnit(token, unitId, payload) {
    const response = await chai
      .request(this.host)
      .put("/units/" + unitId)
      .set("Authorization", "Bearer " + token)
      .set("Content-Type", this.header)
      .set("Accept", this.header)
      .send(payload);
    return response;
  }

  async deleteUnit(token, unitId) {
    const response = await chai
      .request(this.host)
      .delete("/units/" + unitId)
      .set("Authorization", "Bearer " + token)
      .set("Accept", this.header);
    return response;
  }
}

module.exports = unit;
