const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require('../../data/datas.json');
chai.use(chaiHttp)

class categories {
  constructor() {
    this.host = data.baseURL
    this.header = data.header
  }

  async addCategories(token, payload) {
    const response = await chai.request(this.host)
    .post('/categories')
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    .send(payload)
    return response
  }

  async getCategories(token, categoryId) {
    const response = await chai.request(this.host)
    .get('/categories/'+categoryId)
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    return response
  }

  async updateCategories(token, categoryId, payload) {
    const response = await chai.request(this.host)
    .put('/categories/'+categoryId)
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    .send(payload)
    return response
  }

  async deleteCategories(token, categoryId) {
    const response = await chai.request(this.host)
    .delete('/categories/'+categoryId)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', this.header)
    return response
  }
  

}

module.exports = categories