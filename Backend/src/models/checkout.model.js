const uuid = require('uuidv4');

module.exports = (sequelize, Sequelize) => {
  const Checkout = sequelize.define('checkout', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    userid: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    product: {
      type: Sequelize.TEXT,
    },
    total: {
      type: Sequelize.STRING,
    },
    discount: {
      type: Sequelize.STRING,
      defaultValue: 0,
    },
    paidOrNot: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return Checkout;
};
