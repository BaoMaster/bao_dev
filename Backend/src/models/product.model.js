module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    brand: {
      type: Sequelize.STRING,
      required: true,
    },
    productname: {
      type: Sequelize.STRING,
      required: true,
    },
    size: {
      type: Sequelize.STRING,
      required: true,
    },

    productcode: {
      type: Sequelize.STRING,
      required: true,
    },
    illustration: {
      type: Sequelize.STRING,
      required: true,
    },
    description: {
      type: Sequelize.TEXT,
      required: true,
    },
    price: {
      type: Sequelize.STRING,
      required: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      required: true,
    },
  });
  return Product;
};
