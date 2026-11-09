const { DataTypes } = require("sequelize");
const sequelize = require("./database/connection");

const PedidoRetiro = sequelize.define("PedidoRetiro", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  repuestoId: DataTypes.INTEGER,
  repuestoNombre: DataTypes.STRING(150),
  cantidad: DataTypes.INTEGER,
  fecha: DataTypes.STRING(20),
  motivo: DataTypes.TEXT,
  vehiculoPatente: { type: DataTypes.STRING(10), allowNull: true },
  autorizadoPor: DataTypes.STRING(120),
}, { tableName: "pedidos_retiro" });

module.exports = PedidoRetiro;
