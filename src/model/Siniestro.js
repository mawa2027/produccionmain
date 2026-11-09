const { DataTypes } = require("sequelize");
const sequelize = require("./database/connection");

const Siniestro = sequelize.define("Siniestro", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patente: DataTypes.STRING(10),
  vehiculoMarca: DataTypes.STRING(120),
  choferNombre: { type: DataTypes.STRING(120), allowNull: true },
  choferDni: { type: DataTypes.STRING(20), allowNull: true },
  fecha: DataTypes.STRING(20),
  fechaRegistro: DataTypes.STRING(20),
  ubicacion: DataTypes.STRING(150),
  descripcion: DataTypes.TEXT,
  danosVehiculo: DataTypes.TEXT,
  tercero: { type: DataTypes.JSON, allowNull: true },
  archivos: { type: DataTypes.JSON, defaultValue: [] },
  estado: { type: DataTypes.ENUM("EN PROCESO", "RESUELTO"), defaultValue: "EN PROCESO" },
}, { tableName: "siniestros" });

module.exports = Siniestro;
