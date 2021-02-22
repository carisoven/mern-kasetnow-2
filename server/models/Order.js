const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default:'Not processed',
        enum:['Not processed', 'Processing','Confirmorder', 'Shipped', 'Delivered', 'Cancelled']
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = Mongoose.model('Order', OrderSchema);