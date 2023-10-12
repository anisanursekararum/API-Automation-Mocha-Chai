const chai = require("chai");
const { describe, it } = require("mocha");
const transactions = require("../apis/transaction.api");
const auth = require("../apis/auth.api");
const products = require("../apis/products.api");
const categories = require("../apis/categories.api");
const customers = require("../apis/customers.api");
const data = require("../../data/datas.json");
const message = require("../../data/messages.json");
const chaiSchema = require("chai-json-schema");
const expect = require("chai").expect;
chai.use(chaiSchema);

describe("TS Products", () => {
  let token = "";
  let uniqueSeed = Date.now().toString();
  let productId = "";
  let categoryId = "";
  let customerId = "";
  let saleId = "";

  const today = new Date();
  const year = today.getFullYear(); 
  const month = today.getMonth() + 1; 
  const day = today.getDate(); 
  const formattedDate = `${year}-${month}-${day}`;

  before(async () => {
    const response = await new auth().login({
      email: data.email,
      password: data.password,
    });
    token = response.body.data.accessToken;
  });

  before(async () => {
    const response = await new categories().addCategories(token, {
      name: data.categoryName,
      description: data.categoryDesc,
    });
    categoryId = response.body.data.categoryId;
    expect(response.statusCode).to.be.equal(201);
  });

  before(async () => {
    const response = await new customers().addCustomer(token, {
      name: data.customerName,
      phone: data.customerPhone,
      address: data.customerAddress,
      description: data.customerDesc,
    });
    customerId = response.body.data.customerId;
    expect(response.statusCode).to.be.equal(201);
  })

  before(async () => {
    const response = await new products().addProduct(token, {
      category_id: categoryId,
      code: uniqueSeed,
      name: data.productName,
      price: data.productPrice,
      cost: data.productCost,
      stock: data.productStock,
    });
    productId = response.body.data.productId;
    expect(response.statusCode).to.be.equal(201);
  });

  it("TC successfully add sale", async () => {
    const response = await new transactions().addSale(token, {
      officeId: data.officeId,
      customerId: customerId,
      date: formattedDate,
      invoice: data.invoice,
      amount: 2000,
      discount: 0,
      description: data.transactionDesc,
      items : [
          {
            productId: productId,
            quantity: 1,
            price: 2000
          }
      ]
    });
    saleId = response.body.data.saleId;
    expect(response.statusCode).to.be.equal(201);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.message).to.be.equal(message.successAddTransaksi);
  });

  it("TC successfully get sale", async () => {
    const response = await new transactions().getSale(token, saleId);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal(message.success);
    expect(response.body.data.sale.invoice).to.be.equal(data.invoice);
    expect(response.body.data.sale.description).to.be.equal(data.transactionDesc);
    expect(response.body.data.sale.casier).to.be.equal(data.casier);
    expect(response.body.data.sale.customer_id).to.be.equal(customerId);
    expect(response.body.data.sale.customer_name).to.be.equal(data.customerName);
    expect(response.body.data.sale.items[0].id).to.be.equal(productId);
    expect(response.body.data.sale.items[0].name).to.be.equal( data.productName);
  })

});