const uuid = require('uuidv4');
const shortId = require('shortid');
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
module.exports = (sequelize, Sequelize) => {
  const Checkout = sequelize.define('histories', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    ordercode: {
      type: Sequelize.STRING,
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
    email: {
      type: Sequelize.STRING,
    },
    product: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.STRING,
    },
    discount: {
      type: Sequelize.STRING,
      defaultValue: 0,
    },
    note: {
      type: Sequelize.STRING,
    },
  });
  return Checkout;
};