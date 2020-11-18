const db = require("../../config/db.config");
const Product = db.product;
const Cart = db.cart;

exports.addToCart = (req, res) => {
  Cart.create({
    userid: req.user.userid,
    productid: req.body.productid,
    amount: req.body.amount,
  })
    .then((data) => {
      return res.json({ status: "success" });
    })
    .catch((err) => {
      return res.status(err).json(err);
    });
};
exports.RemoveFromCart = (req, res) => {
  Cart.findOne({
    where: {
      userId: req.user.userId,
    },
  }).then((res) => {
    Cart.destroy({
      where: {
        productid: res.body.productid,
      },
    }).then((num) => {
      if (num == 1) {
        res.json({
          status: "success",
        });
      }
    });
  });
};
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          status: "success",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};
exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.findOne({ where: { id } }).then((data) => {
    return res.json({ status: "success", data: data });
  });
};
exports.getProduct = (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err).json({ err });
    });
};
exports.addProduct = (req, res) => {
  Product.findOne({
    where: { brand: req.body.brand },
  })
    .then((pro) => {
      if (pro) {
        if (req.body.productcode === pro.productcode) {
          return res.status(401).json({
            status: "fail",
            message: "Your product already have in store",
          });
        }
      }
      Product.create({
        brand: req.body.brand,
        productcode: req.body.productcode,
        price: req.body.price,
        productname: req.body.productname,
        description: req.body.description,
        illustration: req.body.illustration,
        amount: req.body.amount,
      })
        .then((data) => {
          return res.json({ status: "success" });
        })
        .catch((err) => {
          return res.status(err).json(err);
        });
    })
    .catch((err) => {
      res.status(err).json({ status: "fail", message: err });
    });
};
exports.updateProduct = (req, res) => {
  Product.update(req.body, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({ status: "success" });
      }
    })
    .catch((err) => {
      return res.status(err).json({ err: err.message });
    });
};
