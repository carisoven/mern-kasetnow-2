const express = require("express");
const auth = require("../../middleware/auth");
const Cart = require("../../models/Cart");
const router = express.Router();

// * POST /cart/add
// * Create Cart
router.post('/add', auth, (req, res) => {
  const user = req.user.id;
  const products = req.body.products;

  const cart = new Cart({
    user,
    products
  });

  cart.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      cartId: data.id
    });
  });
});

// * DELETE /cart/delete/:cartid
// * Remove Cart
router.delete('/delete/:cartId', auth, (req, res) => {
  Cart.deleteOne({ _id: req.params.cartId }, err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

// * POST /add/cartid
// * Update Cart
router.post('/add/:cartId', auth, (req, res) => {
  const product = req.body.product;
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $push: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

// * DELETE /delete/cartid/productid
// * Remove Product in Cart
router.delete('/delete/:cartId/:productId', auth, (req, res) => {
  const product = { product: req.params.productId };
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $pull: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});





module.exports = router;