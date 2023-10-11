const chai = require("chai");
const { describe, it } = require("mocha");
const user = require("../apis/user.api");
const auth = require("../apis/auth.api");
const data = require('../../data/datas.json');
const message = require('../../data/messages.json');
const chaiSchema = require('chai-json-schema');
const expect = require('chai').expect
chai.use(chaiSchema)

describe('User', () => {
	let token = ''
	let uniqueSeed = Date.now().toString()
	let userId = ''
	
	before(async () => {
		const response = await new auth().login({
			"email": data.email,
			"password": data.password
		})
		token = response.body.data.accessToken
	})
	
	it('successfully add user', async () => {
		const response = await new user().addUser(token,
			{
				"name": "user"+uniqueSeed,
				"email": uniqueSeed+"user@gmail.com",
				"password": "password"
			})
			userId = response.body.data.userId
			expect(response.statusCode).to.be.equal(201);
			expect(response.body.status).to.be.equal(message.success);
			expect(response.body.message).to.be.equal(message.successAddUser);
		})
		
	it('get detail user', async () => {
		const response = await new user().getUser(token, userId)
		expect(response.statusCode).to.be.equal(200);
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
									"user": {
											"$ref": "#/definitions/User"
									}
							},
							"required": [
									"user"
							],
							"title": "Data"
					},
					"User": {
							"type": "object",
							"additionalProperties": false,
							"properties": {
									"id": {
											"type": "string",
											"format": "uuid"
									},
									"name": {
											"type": "string"
									},
									"email": {
											"type": "string"
									},
									"role": {
											"type": "string"
									}
							},
							"required": [
									"email",
									"id",
									"name",
									"role"
							],
							"title": "User"
						}
			}
		})
	})

	it('update user', async () => {
		const response = await new user().updateUser(token, userId, 
			{
				"name" : data.nameUpdate, 
				"email": uniqueSeed+"userUpdate@gmail.com",
			})
			expect(response.statusCode).to.be.equal(200);
			expect(response.body.status).to.be.equal(message.success);
			expect(response.body.message).to.be.equal(message.successUpdateUser);
			expect(response.body.data.name).to.be.equal(data.nameUpdate);
	})

	it('delete user', async () => {
		const response = await new user().deleteUser(token, userId)
			expect(response.statusCode).to.be.equal(200);
			expect(response.body.status).to.be.equal(message.success);
			expect(response.body.message).to.be.equal(message.successDeleteUser);
	})
})