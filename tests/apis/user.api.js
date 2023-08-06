const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require('../../data/datas.json');
chai.use(chaiHttp)

class user {
  constructor() {
    this.host = data.baseURL
    this.header = data.header
  }

  async addUser(token, payload) {
    const response = await chai.request(this.host)
    .post('/users')
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    .send(payload)
    return response
  }

  async getUser(token, userId) {
    const response = await chai.request(this.host)
    .get('/users/'+userId)
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    return response
  }
  

}

module.exports = user