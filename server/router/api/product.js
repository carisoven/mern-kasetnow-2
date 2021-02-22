const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const Shop = require("../../models/Shop");
const Product = require("../../models/Product");
// * Aws and multer import
const multer = require("multer");
const AWS = require("aws-sdk");
// * AWS and multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// * All User
// TODO : user ทุกสสิทธิสามารถเข้าถึงได้

// * GET /productshop
// ? แสดงProduct ในร้านค้า Shop (User) Own Shop
router.get("/productshop/:shopid", auth, async (req, res) => {
  try {
    const productshop = await Product.find({ "shop.id": req.params.shopid });
    console.log(productshop);
    res.json(productshop);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// * POST /product/addproduct
// ? เพิ่มสินนค้าลงใน Shop (User)
router.post("/addproduct", auth, upload.single("image"), async (req, res) => {
  try {
    // * Refer on input data
    const {
      shopid,
      productname,
      producttype,
      price,
      invent,
      detail,
      discription,
    } = req.body;
    const shop2 = await Shop.findOne({ _id: shopid });
    console.log(shop2);
    if (shop2.isApprove === false) {
      res.status(404).send("Shop not approve by Admin");
    }
    // ! photo upload
    const image = req.file;
    if (image) {
      const s3bucket = new AWS.S3({
        accessKeyId: process.env.ACESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY,
        region: process.env.REGION,
      });
      const params = {
        Bucket: process.env.BUCKET,
        Key: image.originalname,
        Body: image.buffer,
        ContentType: image.mimetype,
        ACL: "public-read-write",
      };
      const s3Upload = await s3bucket.upload(params).promise();
      imageUrl = s3Upload.Location;
      imageKey = s3Upload.key;
    }

    // ! Add Product Database
    const product = new Product({
      productname: productname,
      producttype: producttype,
      detail: detail,
      discription: discription,
      price: price,
      invent: invent,
      imageUrl,
      imageKey,
      shop: { id: shop2.id, shopname: shop2.shopname },
    });
    const products = await product.save();

    // ! Add Product in Shop
    const shopupdate = await Shop.updateOne(
      { shopname: shop2.shopname },
      {
        $push: {
          product: {
            _id: products.id,
            productname: products.productname,
            producttype: products.producttype,
          },
        },
      }
    );
    console.log(shopupdate);
    2;
    //Show Log and Output
    console.log(products);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// * POST /product/edit/productid
// ? แก้ไขข้อมูลสินนค้าลงใน Shop (User)
router.post(
  "/edit/:productid",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const productedit = await Product.findById(req.params.productid).populate(
        "shop"
      );
      const image = req.file;
      const { productname, producttype, price, detail, discription } = req.body;
      if (image) {
        const s3bucket = new AWS.S3({
          accessKeyId: process.env.ACESSKEYID,
          secretAccessKey: process.env.SECRETACCESSKEY,
          region: process.env.REGION,
        });

        const params = {
          Bucket: process.env.BUCKET,
          Key: productedit.imageKey,
        };
        s3bucket.deleteObject(params, (error, data) => {
          if (error) {
            res.status(500).send(error);
          }
        });
        const params2 = {
          Bucket: process.env.BUCKET,
          Key: image.originalname,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: "public-read-write",
        };
        const s3Upload = await s3bucket.upload(params2).promise();
        imageUrl = s3Upload.Location;
        imageKey = s3Upload.key;
      }
      const product = {
        productname: productname,
        producttype: producttype,
        detial: detail,
        discription: discription,
        price: price,
        amount: productedit.amount,
        imageUrl,
        imageKey,
      };
      console.log(product);
      const productupdate = await Product.findOneAndUpdate(
        { _id: productedit.id },
        { $set: product },
        { new: true }
      );
      console.log(productupdate);
      res.json(productupdate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// * POST /product/addstock/productid
// ? Update สินค้า (User)
router.post("/addstock/:productid", auth, async (req, res) => {
  try {
    const searchproduct = await Product.findById(req.params.productid).populate(
      "shop"
    );
    const { amount } = req.body;
    console.log(searchproduct);
    const stock = {
      amount: searchproduct.amount + amount,
    };
    const addstock = await Product.findByIdAndUpdate(
      searchproduct.id,
      { $set: stock },
      { new: true }
    );

    console.log(addstock);
    res.json(addstock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// * DELETE /product/delete/productid
// ? Delete สินค้า
router.delete("/delete/:productid", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productid, (err) => {
      console.error(err);
      res.status(400).send("Product Not Found");
    });
    const shop = await Shop.findById(product.shop.id, (err) => {
      console.error(err);
      res.status(400).send("You don't have Shop");
    });
    if (shop.adminshop.id != req.user.id) {
      res.status(403).send("This Product in your Shop");
    }
    const s3bucket = new AWS.S3({
      accessKeyId: process.env.ACESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION,
    });
    const params = {
      Bucket: process.env.BUCKET,
      Key: product.imageKey,
    };
    s3bucket.deleteObject(params, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });

    await Product.findByIdAndDelete(product.id);
    res.json({ Message: "Data Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// * Admin
// TODO : สิทธิของ Admin

// * Superadmin
// TODO : สิทธิของ Superadmin

// * POST /product/sa-addproduct/shopid
// ? เพิ่มสินนค้าลงใน Shop (SuperAdmin)
router.post(
  "/sa-addproduct/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      // * Refer on input data
      const {
        productname,
        producttype,
        price,
        invent,
        detail,
        discription,
      } = req.body;
      const shop2 = await Shop.findOne({ id: req.params.id });
      if (shop2.isApprove === false) {
        res.status(404).send("Shop not approve by Admin");
      }
      // ! photo upload
      const image = req.file;
      if (image) {
        const s3bucket = new AWS.S3({
          accessKeyId: process.env.ACESSKEYID,
          secretAccessKey: process.env.SECRETACCESSKEY,
          region: process.env.REGION,
        });
        const params = {
          Bucket: process.env.BUCKET,
          Key: image.originalname,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: "public-read-write",
        };
        const s3Upload = await s3bucket.upload(params).promise();
        imageUrl = s3Upload.Location;
        imageKey = s3Upload.key;
      }

      // ! Add Product Database
      const product = new Product({
        productname: productname,
        producttype: producttype,
        detial: detail,
        discription: discription,
        price: price,
        invent: invent,
        imageUrl,
        imageKey,
        shop: { id: shop2.id, shopname: shop2.shopname },
      });
      const products = await product.save();

      // ! Add Product in Shop
      const shopupdate = await Shop.updateOne(
        { shopname: shop2.shopname },
        {
          $push: {
            product: {
              _id: products.id,
              productname: products.productname,
              producttype: products.producttype,
            },
          },
        }
      );

      //Show Log and Output
      console.log(products, shopupdate);
      res.json(shopupdate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
