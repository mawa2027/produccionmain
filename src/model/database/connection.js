// Conexión Sequelize a MySQL. Los datos salen de .env (ver .env.example).
const { Sequelize } = require("sequelize");
const config = require("./config/config.js")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
