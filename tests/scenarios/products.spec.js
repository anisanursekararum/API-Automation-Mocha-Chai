const chai = require("chai");
const { describe, it } = require("mocha");
const products = require("../apis/products.api");
const auth = require("../apis/auth.api");
const data = require('../../data/datas.json');
const message = require('../../data/messages.json');
const chaiSchema = require('chai-json-schema');
const expect = require('chai').expect
chai.use(chaiSchema)

describe('TS Products', () => {
	let token = ''
  let uniqueSeed = Date.now().toString()
	let productId = ''
  let code = ''

	before(async () => {
		const response = await new auth().login({
			"email": data.email,
			"password": data.password
		})
		token = response.body.data.accessToken
	})
	
	it('TC successfully add product', async () => {
		const response = await new products().addProduct(token,
			{
        "category_id": data.productCategoryID,
        "code": uniqueSeed,
        "name": data.productName,
        "price": data.productPrice,
        "cost": data.productCost,
        "stock": data.productStock
			})
			productId = response.body.data.productId
			expect(response.statusCode).to.be.equal(201);
			expect(response.body.status).to.be.equal(message.success);
			expect(response.body.message).to.be.equal(message.successAddProduct);
			expect(response.body.data.name).to.be.equal(data.productName);
		})
		
	it('TC get detail product', async () => {
		const response = await new products().getProduct(token, productId)
    const price = response.body.data.product.price.toString()
    const cost = response.body.data.product.cost.toString()
    const stock = response.body.data.product.stock.toString()
		expect(response.statusCode).to.be.equal(200);
		expect(response.body.status).to.be.equal(message.success);
		expect(response.body.data.product.name).to.be.equal(data.productName);
		expect(price).to.be.equal(data.productPrice);
		expect(response.body.data.product.category_id).to.be.equal(data.productCategoryID);
		expect(cost).to.be.equal(data.productCost);
		expect(stock).to.be.equal(data.productStock);
		expect(response.body).to.be.jsonSchema({
      "$schema": "http://json-schema.org/draft-06/schema#",
      "$ref": "#/definitions/Welcome5",
      "definitions": {
          "Welcome5": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "status": {
                      "type": "string"
                  },
                  "data": {
                      "$ref": "#/definitions/Data"
                  }
              },
              "required": [
                  "data",
                  "status"
              ],
              "title": "Welcome5"
          },
          "Data": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "product": {
                      "$ref": "#/definitions/Product"
                  }
              },
              "required": [
                  "product"
              ],
              "title": "Data"
          },
          "Product": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "code": {
                      "type": "string"
                  },
                  "name": {
                      "type": "string"
                  },
                  "description": {
                      "type": "null"
                  },
                  "price": {
                      "type": "integer"
                  },
                  "cost": {
                      "type": "integer"
                  },
                  "cost_average": {
                      "type": "null"
                  },
                  "category_name": {
                      "type": "string"
                  },
                  "category_id": {
                      "type": "string",
                      "format": "uuid"
                  },
                  "stock": {
                      "type": "integer"
                  }
              },
              "required": [
                  "category_id",
                  "category_name",
                  "code",
                  "cost",
                  "cost_average",
                  "description",
                  "name",
                  "price",
                  "stock"
              ],
              "title": "Product"
          }
      }
		})
	})

	it('TC update product', async () => {
		const response = await new products().updateProduct(token, productId, 
			{
        "category_id": data.productCategoryID,
        "code": uniqueSeed,
        "name": data.productNameUpdate,
        "price": data.productPriceUpdate,
        "cost": data.productCostUpdate,
        "stock": data.productStockUpdate
			})
			expect(response.statusCode).to.be.equal(200);
			expect(response.body.status).to.be.equal(message.success);
			expect(response.body.message).to.be.equal(message.successUpdateProduct);
			expect(response.body.data.name).to.be.equal(data.productNameUpdate);
	})

	it('TC delete product', async () => {
		const response = await new products().deleteProduct(token, productId)
			expect(response.statusCode).to.be.equal(200);
			expect(response.body.status).to.be.equal(message.success);
	})
})