const { product } = require('../../config/db.config');
const db = require('../../config/db.config');
const Product = db.product;
const Cart = db.cart;
const Checkout = db.checkout;
const History = db.history;

exports.addToCart = (req, res) => {
  Cart.create({
    userid: req.user.userid,
    productid: req.body.productid,
    amount: req.body.amount,
  })
    .then((data) => {
      return res.json({ status: 'success' });
    })
    .catch((err) => {
      return res.status(err).json(err);
    });
};
exports.deleteCartByUserid = (req, res) => {
  // return res.json(req.body.userid);
  Cart.destroy({ where: { userid: req.query.userid } })
    .then((num) => {
      // if (num >= 0) {
      //   return res.json({
      //     status: 'success',
      //     message: 'Detele product from cart successfully',
      //   });
      // }

      return res.json({
        status: 'success',
        message: 'Detele product from cart successfully',
      });
    })
    .catch((err) => {
      return res.status(402).json({ status: 'fail', message: err.message });
    });
};
exports.deleteCheckoutByUserid = (req, res) => {
  // return res.json(req.body.userid);

  Checkout.destroy({ where: { userid: req.query.userid } })
    .then((num) => {
      // if (num == 1) {
      //   return res.json({
      //     status: 'success',
      //     message: 'Detele product from checkout successfully',
      //   });
      // }
      return res.json({
        status: 'success',
        message: 'Detele product from checkout successfully',
      });
    })
    .catch((err) => {
      return res.status(402).json({ status: 'fail', message: err.message });
    });
};
exports.addToHistory = (req, res) => {
  History.create({
    userid: req.body.userid,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    total: req.body.total,
    discount: req.body.discount,
    note: req.body.note,
    product: req.body.product,
    ordercode: req.body.ordercode,
  })
    .then((data) => {
      return res.json({ status: 'success' });
    })
    .catch((err) => {
      return res.status(err).json(err);
    });
};
exports.getInfoFromCheckout = (req, res) => {
  Checkout.findAll({
    where: { userid: req.params.userid },
    order: [['createdAt', 'DESC']],
  })
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      return res.status(err).json(err);
    });
};
exports.addToCheckout = (req, res) => {
  Checkout.create({
    userid: req.body.userid,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    total: req.body.total,
    discount: req.body.discount,
    note: req.body.note,
    product: req.body.product,
  })
    .then((data) => {
      return res.json({ status: 'success' });
    })
    .catch((err) => {
      return res.status(err).json(err);
    });
};
exports.removeFromCart = (req, res) => {
  Cart.findAll({
    where: {
      userid: req.query.userid,
      productid: req.query.productid,
    },
  })

    .then((data) => {
      if (data.length > 0) {
        Cart.destroy({
          where: { id: data[0].id },
        })
          .then((num) => {
            if (num == 1) {
              return res.json({
                status: 'success',
                message: 'Detele product from cart successfully',
              });
            }
          })
          .catch((err) => {
            return res.status(402).json({ status: 'fail', message: err.message });
          });
        // return res.json({ data });
      } else {
        return res.status(402).json({ message: 'not Found' });
      }
      // if (data.length > 0) {
      //   Cart.destroy({
      //     where: {
      //       productid: req.body.productid,
      //     },
      //   })
      //     .then((num) => {
      //       if (num == 1) {
      //         return res.json({
      //           status: 'success',
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       return res.status(402).json({ err });
      //     });
      // }
    })
    .catch((err) => {
      return res.status(403).json({ message: err.message });
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
          status: 'success',
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
    return res.json({ status: 'success', data: data });
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
exports.getProductFromCart = (req, res) => {
  const id = req.params.id;

  Cart.findAll({
    where: { userid: id },
    raw: true,
  })
    .then(async (data) => {
      for (let i = 0; i < data.length; i++) {
        let productsQuery = await Product.findOne({
          where: { id: data[i].productid },
        });
        data[i].products = productsQuery;
      }
      res.json(data);
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
            status: 'fail',
            message: 'Your product already have in store',
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
          return res.json({ status: 'success' });
        })
        .catch((err) => {
          return res.status(err).json(err);
        });
    })
    .catch((err) => {
      res.status(err).json({ status: 'fail', message: err });
    });
};
exports.addProductToCart = (req, res) => {
  const { productid, userid } = req.body;
  console.log('userid', productid);
  Cart.findAll({
    where: { userid: req.body.userid },
  })
    .then(async (cart) => {
      if (cart.length > 0) {
        let data = null;
        let products = cart.filter((x) => x.productid == productid);
        if (products.length > 0) {
          let amount = Number(products[0].amount) + 1;
          data = await Cart.update({ amount }, { where: { id: products[0].id } });
          return res.json({ statusss: 'success', data });
        }
      }
      data = await Cart.create({
        userid: req.body.userid,
        productid: req.body.productid,
      });
      return res.json({ statusss: 'success', data });
    })
    .catch((err) => {
      res.status(err).json({ status: 'fail', message: err });
    });
};
exports.updateProduct = (req, res) => {
  Product.update(req.body, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({ status: 'success' });
      }
    })
    .catch((err) => {
      return res.status(err).json({ err: err.message });
    });
};
