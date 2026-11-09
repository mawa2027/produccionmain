// Configuración de la base de datos (la usan Sequelize y sequelize-cli).
// Los datos de conexión salen del archivo .env (ver .env.example).
require("dotenv").config();

const base = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || "tienda_db",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql",
  // Zona horaria de las fechas (Argentina por defecto). Debe coincidir con
  // el "SET time_zone" de database/datos-prueba.sql
  timezone: process.env.DB_TIMEZONE || "-03:00",
  logging: process.env.DB_LOG === "true" ? console.log : false,
  // Que los DECIMAL lleguen como número y no como texto, y que las columnas
  // JSON lleguen ya parseadas. MariaDB no tiene un tipo JSON real (es un
  // alias de LONGTEXT), así que mysql2 informa esas columnas como "BLOB",
  // igual que un TEXT común (ej. "observaciones"). Para no romper el texto
  // libre, sólo se intenta parsear cuando el contenido arranca con "{"/"[".
  dialectOptions: {
    decimalNumbers: true,
    dateStrings: false,
    typeCast: function (field, next) {
      if (field.type === "BLOB" || field.type === "JSON") {
        const valor = field.string();
        if (valor === null) return null;
        const primero = valor.charAt(0);
        if (primero === "{" || primero === "[") {
          try {
            return JSON.parse(valor);
          } catch (e) {
            return valor;
          }
        }
        return valor;
      }
      return next();
    },
  },
  define: {
    underscored: true,
    freezeTableName: true,
    createdAt: "creado_en",
    updatedAt: "actualizado_en",
  },
};

module.exports = {
  development: base,
  test: { ...base, database: process.env.DB_NAME_TEST || `${base.database}_test` },
  production: base,
};
