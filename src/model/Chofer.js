const { DataTypes } = require("sequelize");
const sequelize = require("./database/connection");

const Chofer = sequelize.define("Chofer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING(60),
  apellido: DataTypes.STRING(60),
  dni: DataTypes.STRING(20),
  telefono: DataTypes.STRING(30),
  email: DataTypes.STRING(120),
  direccion: DataTypes.STRING(150),
  fechaNacimiento: DataTypes.STRING(20),
  fechaIngreso: DataTypes.STRING(20),
  turno: DataTypes.STRING(30),
  estado: { type: DataTypes.ENUM("Activo", "Inactivo"), defaultValue: "Activo" },
  foto: DataTypes.STRING(255),
  inactividad: { type: DataTypes.JSON, allowNull: true },
  licencia: { type: DataTypes.JSON, defaultValue: {} },
  licenciaNacional: { type: DataTypes.JSON, allowNull: true },
  documentos: { type: DataTypes.JSON, defaultValue: {} },
}, { tableName: "choferes" });

module.exports = Chofer;
