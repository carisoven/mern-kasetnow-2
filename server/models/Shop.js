const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    shopname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String
    },
    phonenumber: {
        type: String
    },
    address: {
        type: String
    },
    adminshop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
    },
    product:[
        {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        productname: {
            type: mongoose.Schema.Types.String,
            ref: "product"
        },
        producttype: {
            type: mongoose.Schema.Types.String,
            ref: "product"
        }
    }
    ]
    ,
    isApproved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Waiting Approval',
        enum: ['Active', , 'Not Active', 'Waiting Approval', 'Rejected']
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Shop = mongoose.model('Shop', ShopSchema);
