const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("../../data/datas.json");
chai.use(chaiHttp);

class auth {
  constructor() {
    this.host = data.baseURL;
    this.header = data.header;
  }

  async registration(payload) {
    const response = await chai
      .request(this.host)
      .post("/registration")
      .send(payload)
      .set("Content-Type", this.header)
      .set("Accept", this.header);
    return response;
  }

  async login(payload) {
    const response = await chai
      .request(this.host)
      .post("/authentications")
      .send(payload)
      .set("Content-Type", this.header)
      .set("Accept", this.header);
    return response;
  }
}

module.exports = auth;
