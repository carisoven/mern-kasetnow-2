const express = require('express');
const router = express.Router();
//middleware check
const { check, validationResult } = require('express-validator');
//DB connect
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const Shop = require('../../models/Shop');
const User = require('../../models/User');
const Product = require('../../models/Product');

// * All User
// TODO : user ทุกสสิทธิสามารถเข้าถึงได้

// * POST /shop/addshop
// ? Add Shop By User

router.post("/addshop", [auth,
    [
        //Validation config on Content (req)
        check("shopname", "Name is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("address", "Address is required").not().isEmpty(),
    ]
], async (req, res) => {
    //Refer on input data
    const { shopname, email, phonenumber, address } = req.body;
    //Check validation on express validation 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    try {
        //Find user and Verify on DB and add Owner
        const user = await User.findById(req.user.id).select("-password");
        //Find Name Shop On DB 
        let shopcheck = await Shop.findOne({ shopname: shopname });
        // const shopcheck2 = JSON.stringify(shopcheck);
        // Check same Shop 
        if (shopcheck) {
            if (shopcheck.shopname === shopname) {
                return res.status(400).json({ errors: [{ msg: "Shop already exists" }] })
            }
            if (shopcheck.adminshop.firstname = user.firstname) {
                return res.status(400).json({ errors: [{ msg: "You must only 1 Shop" }] })
            }
        }
        //Get Data DB Structure
        const shop = new Shop({
            shopname,
            email,
            phonenumber,
            address,
            adminshop: user.id
        });
        //Save Data on Structure
        const shopoutput = await shop.save();
        //Show log and Result
        console.log(shopoutput);
        res.json(shopoutput);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// * GET /shoplist/id
// ? User Check Your Shop by User
router.get("/shopload", auth, async (req, res) => {
    try {   
        const shop = await Shop.findOne({adminshop:req.user.id});
        console.log(shop);
        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// * Admin
// TODO : สิทธิของ Admin

// * GET /shop/shoplist
// ? Shop Shop List All By Admin

router.get("/shoplistadmin", auth, role.checkRole(role.ROLES.Admin),
    async (req, res) => {
        try {
            const shop = await Shop.find({});
            console.log(shop);
            res.json(shop);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    });

// * POST /shop/shopapprove
// ? Approve Shop by Admin

router.get("/shopapprove", auth, async (req, res) => {
    try {
        const shop = await Shop.findOne({_id:req.body.id});
        if (!shop) {
            return res.status(400).json({ errors: [{ msg: "Shop not found" }] })
        }
        const shopapprove = {
            isApproved: true,
            status: "Active"
        };
        let shopone = await Shop.findOneAndUpdate(
            { _id: shop.id },
            { $set: shopapprove },
            { new: true }
        );
        console.log(shopone);
        res.json(shopone);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// * DELETE /shop/delete/userid
// ? Delete Shop by Userid
router.delete('/delete/:userid', auth, role.checkRole(role.ROLES.Admin), async (req, res) => {
    try {
        await Cart.deleteMany({ user: req.params.userid }, err => {
            if (err) {
                return res.status(400).json({
                    error: 'Your request could not be processed. Please try again.'
                });
            }
        });
        await Order.deleteMany({ user: req.params.userid }, err => {
            if (err) {
                return res.status(400).json({
                    error: 'Your request could not be processed. Please try again.'
                });
            }
        });
        const shopch = await Shop.findOne({ "adminshop.id": req.params.userid });
        await Product.deleteMany({ "shop.id": shopch.id }, err => {
            if (err) {
                return res.status(400).json({
                    error: 'Your request could not be processed. Please try again.'
                });
            }
        });
        await Shop.findOneAndDelete({ "adminshop.id": req.params.userid });
        res.json({ msg: "Data Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// * Superadmin
// TODO : สิทธิของ Superadmin

module.exports = router;