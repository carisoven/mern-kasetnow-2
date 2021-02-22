
const express = require('express');
const auth = require('../../middleware/auth');
const { bulkWrite } = require('../../models/Cart');
const Cart = require('../../models/Cart');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const router = express.Router();

// * POST /order/add
// ? Add Order

router.post("/add", auth, async (req, res) => {
  const cart = req.body.cartId;
  const total = req.body.total;
  const user = req.user.id;

  const order = new Order({
    cart,
    user,
    total
  });
  const orderDoc = await order.save();

  const orderDoc2 = await Order.findById(orderDoc.id).populate('cart user', '-password');
  console.log(orderDoc2);
  const cartDoc = await Cart.findById(orderDoc2.cart._id).populate({
    path: 'products.product',
    populate: {
      path: 'shop'
    }
  });
  console.log(cartDoc);
  const newOrder = {
    id: orderDoc2.id,
    created: orderDoc2.created,
    user: orderDoc2.user,
    total: orderDoc2.total,
    products: cartDoc.products,
    status: 'Processing'
  };

  console.log(newOrder);
  res.json(newOrder);
});

// * POST /confirmorder/orderid
// ? Confirm Order

router.post("/confirmorder/:orderid",auth,async (req,res)=>{
const order = await Order.findById(req.params.orderid);

const cart = await Cart.findById(order.cart);

if (req.user.id != cart.user && req.user.id != order.user ) {
  res.status(403).send("This order does not belong to you.");
}
const productamount = cart.products

decreaseAmount(productamount);

const ordersadd = {
  status: 'Confirmorder'
}

const orderconfirm = await Order.findByIdAndUpdate(order.id,{$set:ordersadd},{new:true})

console.log(orderconfirm);
res.json(orderconfirm);
});

// * POST /cancelorder/orderid
// ? Cancel Order

router.post("/cancelorder/:orderid",auth,async (req,res)=>{
  const order = await Order.findById(req.params.orderid);

  const cart = await Cart.findById(order.cart);
  
  if (req.user.id != cart.user && req.user.id != order.user ) {
    res.status(403).send("This order does not belong to you.");
  }
  const productamount = cart.products
  reupdateAmount(productamount);
  
  const ordersadd = {
    status: 'Cancelled'
  }
  
  const orderconfirm = await Order.findByIdAndUpdate(order.id,{$set:ordersadd},{new:true})
  
  console.log(orderconfirm);
  res.json(orderconfirm);
});


// ? ตัด Stock
const decreaseAmount = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { amount: -item.amount } }
      }
    };  
  });
  Product.bulkWrite(bulkOptions);
};

// ? Re Stock 
const reupdateAmount = products =>{
  let bulkOptions = products.map(item =>{
    return{
      updateOne:{
        filter: {_id:item.product},
        update:{$inc:{amount: item.amount }}
      }
    }
  });
  Product.bulkWrite(bulkOptions);

}



module.exports = router;