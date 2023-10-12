const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require('../../data/datas.json');
chai.use(chaiHttp)

class products {
  constructor() {
    this.host = data.baseURL
    this.header = data.header
  }

  async addProduct(token, payload) {
    const response = await chai.request(this.host)
    .post('/products')
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    .send(payload)
    return response
  }

  async getProduct(token, productId) {
    const response = await chai.request(this.host)
    .get('/products/'+productId)
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    return response
  }

  async updateProduct(token, productId, payload) {
    const response = await chai.request(this.host)
    .put('/products/'+productId)
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', this.header)
    .set('Accept', this.header)
    .send(payload)
    return response
  }

  async deleteProduct(token, productId) {
    const response = await chai.request(this.host)
    .delete('/products/'+productId)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', this.header)
    return response
  }
  

}

module.exports = products