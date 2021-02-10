const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Cart Item Schema
const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: Number,
    totalPrice: {
        type: Number
    },
    priceWithTax: {
        type: Number,
        default: 0
    }
});

module.exports = CartItem = Mongoose.model('CartItem', CartItemSchema);

// Cart Schema
const CartSchema = new Schema({
    products: [CartItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Cart = Mongoose.model('Cart', CartSchema);
