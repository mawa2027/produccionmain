const { DataTypes } = require("sequelize");
const sequelize = require("./database/connection");

const Documento = sequelize.define("Documento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vehiculoPatente: { type: DataTypes.STRING(10), allowNull: true },
  comisionId: { type: DataTypes.INTEGER, allowNull: true },
  tipo: { type: DataTypes.ENUM("comodato", "acta_entrega", "acta_recepcion", "baja", "acta_maquinaria_entrega", "acta_maquinaria_devolucion", "otro"), defaultValue: "otro" },
  numero: DataTypes.STRING(40),
  fechaEmision: DataTypes.STRING(20),
  fechaVencimiento: { type: DataTypes.STRING(20), allowNull: true },
  comodante: { type: DataTypes.JSON, allowNull: true },
  comodatario: { type: DataTypes.JSON, allowNull: true },
  representantes: { type: DataTypes.JSON, allowNull: true },
  localidad: { type: DataTypes.STRING(120), allowNull: true },
  bienes: { type: DataTypes.JSON, defaultValue: [] },
  taller: { type: DataTypes.STRING(150), allowNull: true },
  fechaRecepcion: { type: DataTypes.STRING(20), allowNull: true },
  observaciones: { type: DataTypes.TEXT, allowNull: true },
  firmas: { type: DataTypes.JSON, defaultValue: {} },
  historial: { type: DataTypes.JSON, defaultValue: [] },
}, { tableName: "documentos" });

module.exports = Documento;
