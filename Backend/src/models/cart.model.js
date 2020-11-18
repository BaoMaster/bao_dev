module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("cart", {
    userid: {
      type: Sequelize.STRING,
      required: true,
    },
    productid: {
      type: Sequelize.STRING,
      required: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      required: true,
      defaultValue: 1,
    },
  });
  return Product;
};
