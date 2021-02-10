const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productname: {
        type: String
    },
    producttype: {
        type: String
    },
    price: {
        type: Number
    },
    amount:{
        type:Number
    },
    imageUrl: {
        type: String
    },
    imageKey: {
        type: String
    },
    shop: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shop"
        },
        shopname:{
            type: mongoose.Schema.Types.String,
            ref: "shop"
        }
    }
});

module.exports = Product = mongoose.model('Product', productSchema);