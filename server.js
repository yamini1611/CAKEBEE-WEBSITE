const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let nextCartId = 1;
let cartItems = [];

app.get('/cartItems', (req, res) => {
  res.json(cartItems);
});

app.post('/cartItems', (req, res) => {
  const selectedCakes = req.body.cartItems;
  const cartItem = {
    cartItems: selectedCakes,
    id: nextCartId++
  };
  cartItems.push(cartItem);
  res.sendStatus(200);
});

app.delete('/cartItems/:cartId/:cakeId', (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const cakeId = parseInt(req.params.cakeId);
  const cartIndex = cartItems.findIndex((cart) => cart.id === cartId);

  if (cartIndex !== -1) {
    const cartItem = cartItems[cartIndex];
    const cakeIndex = cartItem.cartItems.findIndex((cake) => cake.id === cakeId);

    if (cakeIndex !== -1) {
      cartItem.cartItems.splice(cakeIndex, 1);
      res.sendStatus(200);
      return;
    }
  }

  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
