/**
 * Summary. Client data model
 *
 * Description. Maps to client table in DB and contains client basic info.
 *
 * @link   URL
 * @file   This files defines the properties in client model.
 * @since  1.0.0
 */

const db = require("./index");

const { sequelize, Sequelize } = db;

const Client = sequelize.define("client", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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

module.exports = Client;
