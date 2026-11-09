const { DataTypes } = require("sequelize");
const sequelize = require("./database/connection");

const PrestamoHerramienta = sequelize.define("PrestamoHerramienta", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  herramientaId: DataTypes.INTEGER,
  fechaSalida: DataTypes.STRING(20),
  fechaDevolucionEstimada: { type: DataTypes.STRING(20), allowNull: true },
  fechaDevolucionReal: { type: DataTypes.STRING(20), allowNull: true },
  nombreOperario: DataTypes.STRING(120),
  sectorDestino: DataTypes.STRING(80),
  estadoPrestamo: { type: DataTypes.ENUM("Activo", "Devuelto"), defaultValue: "Activo" },
}, { tableName: "prestamos_herramienta" });

module.exports = PrestamoHerramienta;
