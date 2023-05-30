const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

app.use(bodyParser.json());
app.use(cors());

// Load cakes.json data
let jsonData = JSON.parse(fs.readFileSync('cakes.json'));

app.get('/specials', (req, res) => {
  res.json(jsonData.specials);
});

app.get('/menu', (req, res) => {
  res.json(jsonData.menu);
});

app.get('/cartItems', (req, res) => {
  res.json(jsonData.cartItems);
});

app.get('/orders', (req, res) => {
  res.json(jsonData.order);
});

app.get('/sales', (req, res) => {
  res.json(jsonData.sales);
});

app.post('/cartItems', (req, res) => {
  const { cartItems } = req.body;
  const cartItem = {
    cartItems,
    id: jsonData.cartItems.length + 1
  };
  jsonData.cartItems.push(cartItem);
  fs.writeFileSync('cakes.json', JSON.stringify(jsonData, null, 2));
  res.sendStatus(200);
});

app.delete('/cartItems/:cartId/:cakeId', (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const cakeId = parseInt(req.params.cakeId);
  const cartIndex = jsonData.cartItems.findIndex((cart) => cart.id === cartId);

  if (cartIndex !== -1) {
    const cartItem = jsonData.cartItems[cartIndex];
    const cakeIndex = cartItem.cartItems.findIndex((cake) => cake.id === cakeId);

    if (cakeIndex !== -1) {
      cartItem.cartItems.splice(cakeIndex, 1);
      fs.writeFileSync('cakes.json', JSON.stringify(jsonData, null, 2));
      res.sendStatus(200);
      return;
    }
  }

  res.sendStatus(404);
});

app.post('/orders', (req, res) => {
  const { orderItems, customerName, customerEmail, customerPhone } = req.body;
  const orderId = jsonData.order.length + 1;
  const order = {
    orderItems,
    id: orderId,
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone
    }
  };

  jsonData.order.push(order);
  jsonData.sales.push(order);
  fs.writeFileSync('cakes.json', JSON.stringify(jsonData, null, 2));
  res.sendStatus(200);
});

app.post('/sales', (req, res) => {
  const { paymentMethod, cost, deliveryDate, message, size, cakeName } = req.body;
  const saleId = jsonData.sales.length + 1;
  const sale = {
    id: saleId,
    paymentMethod,
    cost,
    deliveryDate,
    message,
    size,
    cakeName
  };

  jsonData.sales.push(sale);
  fs.writeFileSync('cakes.json', JSON.stringify(jsonData, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
