/**
 * Summary. Item data model
 *
 * Description. Maps to item table in DB and contains item basic info.
 *
 * @link   URL
 * @file   This files defines the properties in item model.
 * @since  1.0.0
 */

const Client = require("./client.model");
const db = require("./index");

const { sequelize, Sequelize } = db;

const Item = sequelize.define("line_item", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  client_id: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  cost: {
    type: Sequelize.DOUBLE,
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at",
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: "deleted_at",
    allowNull: true,
  },
});

Item.belongsTo(Client, {
  foreignKey: "client_id",
  targetKey: "id",
});

Client.hasMany(Item, {
  foreignKey: "client_id",
  sourceKey: "id",
});

module.exports = Item;
