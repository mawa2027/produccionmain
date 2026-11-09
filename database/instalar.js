// Crea las tablas (si no existen) y carga los datos de demostración que antes
// vivían en los *MockService.js, para poder arrancar el sistema con MySQL real.
// Uso: npm run db:instalar
require("dotenv").config();
const {
  sequelize,
  Vehiculo,
  Chofer,
  Mantenimiento,
  TurnoService,
  Herramienta,
  PrestamoHerramienta,
  Repuesto,
  PedidoRetiro,
  Siniestro,
  Alerta,
  Rol,
  Usuario,
  Comision,
  Memo,
  Documento,
  Auditoria,
} = require("../src/model");

// Crea la base de datos si todavía no existe (ej. primera vez que se corre
// este script contra un servidor MySQL recién instalado).
async function crearBaseSiNoExiste() {
  const mysql = require("mysql2/promise");
  const config = sequelize.config;
  const conexion = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
  });
  await conexion.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conexion.end();
  console.log(`✔ Base de datos "${config.database}" lista.`);
}

async function instalar() {
  await crearBaseSiNoExiste();
  await sequelize.sync({ force: true });
  console.log("✔ Tablas creadas.");

  await Chofer.bulkCreate([
    {
      id: 1,
      nombre: "Fernando",
      apellido: "Gutiérrez",
      dni: "28.451.902",
      telefono: "11-4455-2210",
      email: "fgutierrez@municipalidad.gob.ar",
      direccion: "Av. San Martín 1450, Centro",
      fechaNacimiento: "12/4/1985",
      fechaIngreso: "3/2/2019",
      turno: "Mañana",
      estado: "Activo",
      licencia: { numero: "L-778234", categoria: "C", fechaEmision: "10/6/2023", fechaVencimiento: "31/12/2027", vencimientoISO: "2027-12-31", historial: [] },
      licenciaNacional: { numero: "N-445210", categoria: "C", fechaEmision: "15/3/2023", fechaVencimiento: "15/3/2028", vencimientoISO: "2028-03-15" },
      documentos: {},
    },
    {
      id: 2,
      nombre: "Marisa",
      apellido: "Fernández",
      dni: "31.220.884",
      telefono: "11-3399-4471",
      direccion: "Belgrano 220, Norte",
      fechaNacimiento: "2/9/1990",
      fechaIngreso: "20/8/2021",
      turno: "Tarde",
      estado: "Activo",
      licencia: { numero: "L-901122", categoria: "B1", fechaEmision: "5/3/2024", fechaVencimiento: "31/12/2026", vencimientoISO: "2026-12-31", historial: [] },
      licenciaNacional: { numero: "N-889213", categoria: "B1", fechaEmision: "5/11/2021", fechaVencimiento: "5/11/2026", vencimientoISO: "2026-11-05" },
      documentos: {},
    },
    {
      id: 3,
      nombre: "Roberto",
      apellido: "Álvarez",
      dni: "24.887.310",
      telefono: "11-2244-8890",
      direccion: "Mitre 890, Sur",
      fechaNacimiento: "30/1/1978",
      fechaIngreso: "11/11/2015",
      turno: "Noche",
      estado: "Activo",
      licencia: { numero: "L-556098", categoria: "D", fechaEmision: "1/12/2025", fechaVencimiento: "31/12/2025", vencimientoISO: "2025-12-31", historial: [] },
      licenciaNacional: { numero: "N-220871", categoria: "D", fechaEmision: "10/9/2020", fechaVencimiento: "10/9/2025", vencimientoISO: "2025-09-10" },
      documentos: {},
    },
    {
      id: 4,
      nombre: "Diego",
      apellido: "Ríos",
      dni: "33.109.774",
      telefono: "11-6677-3321",
      direccion: "Rivadavia 55, Este",
      fechaNacimiento: "18/7/1994",
      fechaIngreso: "2/5/2022",
      turno: "Mañana",
      estado: "Inactivo",
      inactividad: {
        motivo: "licencia_medica",
        motivoLabel: "Licencia médica",
        observaciones: "Licencia médica prolongada por cirugía. Reincorporación sujeta a alta médica.",
        hasta: "2026-12-01",
      },
      licencia: { numero: "L-334509", categoria: "B1", fechaEmision: "8/8/2022", fechaVencimiento: "31/12/2025", vencimientoISO: "2025-12-31", historial: [] },
      licenciaNacional: { numero: "N-776530", categoria: "B1", fechaEmision: "1/6/2020", fechaVencimiento: "1/6/2025", vencimientoISO: "2025-06-01" },
      documentos: {},
    },
    {
      id: 5,
      nombre: "Silvina",
      apellido: "Correa",
      dni: "29.774.115",
      telefono: "11-5588-6612",
      direccion: "Sarmiento 340, Oeste",
      fechaNacimiento: "25/3/1988",
      fechaIngreso: "14/2/2020",
      turno: "Tarde/Noche",
      estado: "Activo",
      licencia: { numero: "L-667788", categoria: "E", fechaEmision: "1/1/2024", fechaVencimiento: "31/12/2026", vencimientoISO: "2026-12-31", historial: [] },
      licenciaNacional: { numero: "N-110492", categoria: "E", fechaEmision: "10/1/2024", fechaVencimiento: "10/1/2029", vencimientoISO: "2029-01-10" },
      documentos: {},
    },
  ]);
  console.log("✔ Choferes.");

  await Vehiculo.bulkCreate([
    {
      patente: "AA001BB", marca: "Toyota", modelo: "Hilux", tipo: "Camioneta", anio: 2019,
      chasis: "CHS-001", motor: "MOT-001", localidad: "Santiago del Estero (Capital)", fechaAlta: "10/1/2023",
      transmision: "Manual", combustible: "Diesel", km: 88000, estado: "EN_USO", choferId: 1,
      documentacion: { cedula: "CED-001", titular: "Municipalidad Capital", seguroCompania: "Federación Patronal", vencSeguro: "15/3/2027", vencRTO: "10/9/2026", rtoVencida: true },
      observaciones: "Unidad de uso frecuente. Revisar amortiguadores en el próximo service.",
    },
    {
      patente: "AB002CC", marca: "Ford", modelo: "Ranger", tipo: "Camioneta", anio: 2017,
      chasis: "CHS-002", motor: "MOT-002", localidad: "La Banda", fechaAlta: "5/3/2022",
      transmision: "Automática", combustible: "Diesel", km: 124000, estado: "BAJA",
      documentacion: { cedula: "CED-002", titular: "Municipalidad Capital", seguroCompania: "La Segunda Seguros", vencSeguro: "20/11/2025", vencRTO: "12/4/2025", rtoVencida: true },
    },
    {
      patente: "AC003DD", marca: "Volkswagen", modelo: "Amarok", tipo: "Camioneta", anio: 2021,
      chasis: "CHS-003", motor: "MOT-003", localidad: "Termas de Río Hondo", fechaAlta: "18/2/2023",
      transmision: "Automática", combustible: "Diesel", km: 45000, estado: "DISPONIBLE",
      documentacion: { cedula: "CED-003", titular: "Municipalidad Capital", seguroCompania: "Federación Patronal", vencSeguro: "2/5/2027", vencRTO: "2/5/2027", rtoVencida: false },
    },
    {
      patente: "AD004EE", marca: "Chevrolet", modelo: "S-10", tipo: "Camioneta", anio: 2016,
      chasis: "CHS-004", motor: "MOT-004", localidad: "Quimilí", fechaAlta: "9/9/2021",
      transmision: "Manual", combustible: "Diesel", km: 198000, estado: "PARA_BAJA",
      observaciones: "Costo de reparación elevado respecto del valor del vehículo. Propuesto para baja.",
      documentacion: { cedula: "CED-004", titular: "Municipalidad Capital", seguroCompania: "Sancor Seguros", vencSeguro: "30/6/2026", vencRTO: "14/1/2026", rtoVencida: false },
    },
    {
      patente: "AE005FF", marca: "Mercedes-Benz", modelo: "Tector", tipo: "Camión", anio: 2015,
      chasis: "CHS-005", motor: "MOT-005", localidad: "Santiago del Estero (Capital)", fechaAlta: "3/4/2020",
      transmision: "Manual", combustible: "Diesel", km: 315000, estado: "PARA_BAJA",
      observaciones: "Unidad con mayor kilometraje de la flota y antigüedad superior a 10 años.",
      documentacion: { cedula: "CED-005", titular: "Municipalidad Capital", seguroCompania: "Federación Patronal", vencSeguro: "22/8/2026", vencRTO: "5/2/2027", rtoVencida: false },
    },
    {
      patente: "AF006GG", marca: "Scania", modelo: "R410", tipo: "Camión", anio: 2018,
      chasis: "CHS-006", motor: "MOT-006", localidad: "Frías", fechaAlta: "27/6/2021",
      transmision: "Automática", combustible: "Diesel", km: 415000, estado: "DISPONIBLE",
      documentacion: { cedula: "CED-006", titular: "Municipalidad Capital", seguroCompania: "La Segunda Seguros", vencSeguro: "11/12/2026", vencRTO: "19/9/2026", rtoVencida: false },
    },
    {
      patente: "AG007HH", marca: "Iveco", modelo: "Tector 170E28", tipo: "Camión", anio: 2019,
      chasis: "CHS-007", motor: "MOT-007", localidad: "La Banda", fechaAlta: "14/11/2022",
      transmision: "Manual", combustible: "Diesel", km: 62000, estado: "DISPONIBLE",
      documentacion: { cedula: "CED-007", titular: "Municipalidad Capital", seguroCompania: "Sancor Seguros", vencSeguro: "8/7/2027", vencRTO: "3/3/2027", rtoVencida: false },
    },
    {
      patente: "AH008II", marca: "Renault", modelo: "Master", tipo: "Furgón", anio: 2020,
      chasis: "CHS-008", motor: "MOT-008", localidad: "Termas de Río Hondo", fechaAlta: "2/2/2023",
      transmision: "Manual", combustible: "Diesel", km: 73000, estado: "DISPONIBLE",
      documentacion: { cedula: "CED-008", titular: "Municipalidad Capital", seguroCompania: "Federación Patronal", vencSeguro: "16/4/2027", vencRTO: "9/12/2026", rtoVencida: false },
    },
  ]);
  console.log("✔ Vehículos.");

  await Mantenimiento.bulkCreate([
    { id: 1, patente: "AA001BB", vehiculo: "Toyota Hilux", fecha: "2026-07-01", tipoServicio: "Cambio de aceite y filtros", estado: "Realizado", kmServicio: 88000, proximoServicioKm: 98000, descripcion: "Cambio de aceite 15W40, filtro de aceite y filtro de aire. Revisión general de niveles.", observaciones: "Sin anomalías detectadas.", costoRepuestos: 45000, manoObra: 20000, costoTotal: 65000, proveedor: "Taller Propio", lugarService: "Propio", pagado: true, fechaPago: "2026-07-01", numeroExpediente: "EXP-2026-00412" },
    { id: 2, patente: "AC003DD", vehiculo: "Volkswagen Amarok", fecha: "2026-05-12", tipoServicio: "Rotación de neumáticos", estado: "Realizado", kmServicio: 45000, proximoServicioKm: 55000, descripcion: "Rotación de neumáticos y balanceo de las cuatro ruedas.", observaciones: "Desgaste normal, dentro de parámetros.", costoRepuestos: 0, manoObra: 18000, costoTotal: 18000, proveedor: "Gomería San Cayetano", lugarService: "Externo", pagado: true, fechaPago: "2026-05-12", numeroExpediente: "EXP-2026-00388" },
    { id: 3, patente: "AD004EE", vehiculo: "Chevrolet S-10", fecha: "2026-08-20", tipoServicio: "Cambio de correa de distribución", estado: "En proceso", kmServicio: 198000, proximoServicioKm: null, descripcion: "Reemplazo de correa de distribución, tensor y bomba de agua.", observaciones: "Se detectó pérdida menor de refrigerante, en evaluación.", costoRepuestos: 68000, manoObra: 27000, costoTotal: 95000, proveedor: "Mecánica Integral del Norte", lugarService: "Externo", pagado: false, fechaPago: null, numeroExpediente: "EXP-2026-00455" },
    { id: 4, patente: "AF006GG", vehiculo: "Scania R410", fecha: "2026-09-10", tipoServicio: "Service de 400.000 km", estado: "En proceso", kmServicio: 415000, proximoServicioKm: 430000, descripcion: "Service mayor programado: aceite, filtros, frenos y suspensión.", observaciones: "Turno reservado en taller central.", costoRepuestos: 0, manoObra: 0, costoTotal: 0, proveedor: "Taller Scania Oficial", lugarService: "Externo", pagado: false, fechaPago: null, numeroExpediente: "" },
  ]);
  console.log("✔ Mantenimientos.");

  await Repuesto.bulkCreate([
    { id: 1, nombre: "Aceite 15W40 (litro)", costoUnitario: 6500, stock: 40 },
    { id: 2, nombre: "Filtro de aceite", costoUnitario: 8500, stock: 22 },
    { id: 3, nombre: "Filtro de aire", costoUnitario: 9200, stock: 18 },
    { id: 4, nombre: "Pastillas de freno (juego)", costoUnitario: 32000, stock: 10 },
    { id: 5, nombre: "Correa de distribución", costoUnitario: 45000, stock: 6 },
    { id: 6, nombre: "Batería 12V", costoUnitario: 78000, stock: 5 },
  ]);
  console.log("✔ Repuestos.");

  await TurnoService.bulkCreate([
    { id: 1, vehiculoPatente: "AC003DD", fechaProgramada: "2026-10-20", tipoServicio: "Service de 50.000 km", taller: "Taller Central", estado: "Programado", observaciones: "Turno confirmado telefónicamente." },
    { id: 2, vehiculoPatente: "AF006GG", fechaProgramada: "2026-11-05", tipoServicio: "Cambio de embrague", taller: "Taller Scania Oficial", estado: "Programado", observaciones: "" },
    { id: 3, vehiculoPatente: "AA001BB", fechaProgramada: "2026-07-01", tipoServicio: "Cambio de aceite y filtros", taller: "Taller Propio", estado: "Realizado", observaciones: "" },
  ]);
  console.log("✔ Turnos de service.");

  const herramientas = await Herramienta.bulkCreate([
    { id: 1, codigoActivo: "HTI-001", nombre: "Taladro Percutor Bosch GSB 550", sector: "Taller Mecánico", stock: 3, estado: "En uso", combustibleEnergia: "220V", fechaAlta: "2024-02-10" },
    { id: 2, codigoActivo: "HTI-002", nombre: "Amoladora Angular Makita 9557", sector: "Construcción A", stock: 1, estado: "Disponible", combustibleEnergia: "220V", fechaAlta: "2023-11-05" },
    { id: 3, codigoActivo: "HTI-003", nombre: "Motoguadaña Stihl FS 220", sector: "Espacios Verdes", stock: 0, estado: "En Reparación", combustibleEnergia: "Nafta", fechaAlta: "2022-08-18", observaciones: "En taller externo por rotura de embrague." },
    { id: 4, codigoActivo: "HTI-004", nombre: "Compresor de Aire 100L", sector: "Depósito Central", stock: 2, estado: "Disponible", combustibleEnergia: "220V", fechaAlta: "2021-04-22" },
    { id: 5, codigoActivo: "HTI-005", nombre: "Soldadora Inverter 200A", sector: "Mantenimiento General", stock: 1, estado: "Baja", fechaAlta: "2019-05-14", observaciones: "Dada de baja por daño irreparable en la placa de control." },
  ]);
  console.log("✔ Herramientas.");

  await PrestamoHerramienta.bulkCreate([
    { herramientaId: herramientas[0].id, fechaSalida: "2026-09-15", fechaDevolucionEstimada: "2026-09-30", fechaDevolucionReal: null, nombreOperario: "Carlos Medina", sectorDestino: "Obras Distrito Norte", estadoPrestamo: "Activo" },
    { herramientaId: herramientas[0].id, fechaSalida: "2026-06-01", fechaDevolucionEstimada: null, fechaDevolucionReal: "2026-06-05", nombreOperario: "Carlos Medina", sectorDestino: "Taller Mecánico", estadoPrestamo: "Devuelto" },
  ]);
  console.log("✔ Préstamos de herramientas.");

  await PedidoRetiro.bulkCreate([
    { id: 1, repuestoId: 1, repuestoNombre: "Aceite 15W40 (litro)", cantidad: 20, fecha: "2026-09-28", motivo: "Cambio de aceite en service de AF006GG", vehiculoPatente: "AF006GG", autorizadoPor: "Administrador Sistema" },
    { id: 2, repuestoId: 4, repuestoNombre: "Pastillas de freno (juego)", cantidad: 1, fecha: "2026-10-05", motivo: "Cambio de pastillas delanteras", vehiculoPatente: "AA001BB", autorizadoPor: "Administrador Sistema" },
  ]);
  console.log("✔ Pedidos de retiro.");

  await Siniestro.bulkCreate([
    {
      id: 1, patente: "AB002CC", vehiculoMarca: "Ford Ranger", choferNombre: "Roberto Álvarez", choferDni: "24.887.310",
      fecha: "2025-10-02", fechaRegistro: "2025-10-02", ubicacion: "Ruta 5, km 34",
      descripcion: "El vehículo derrapó en la ruta por lluvia intensa e impactó contra el guardarraíl, provocando pérdida total.",
      danosVehiculo: "Pérdida total del vehículo.", tercero: null, archivos: ["parte-policial.pdf", "fotos-choque.jpg"], estado: "RESUELTO",
    },
    {
      id: 2, patente: "AD004EE", vehiculoMarca: "Chevrolet S-10", choferNombre: "Diego Ríos", choferDni: "33.109.774",
      fecha: "2026-08-28", fechaRegistro: "2026-08-29", ubicacion: "Av. San Martín y Belgrano",
      descripcion: "Choque leve en cruce de avenidas con un vehículo particular al girar en U.",
      danosVehiculo: "Rotura de óptica delantera derecha y paragolpes.",
      tercero: { vehiculo: "AC456DE - VW Gol", seguro: "La Caja Seguros", conductor: "Martín Soto", contacto: "11-2233-4455" },
      archivos: ["denuncia-seguro.pdf"], estado: "EN PROCESO",
    },
  ]);
  console.log("✔ Siniestros.");

  await Alerta.bulkCreate([
    { id: 1, tipo: "licencia_vencida", mensaje: "La licencia de conducir de Diego Ríos está vencida desde el 8/8/2025.", entidadNombre: "Diego Ríos", entidadTipo: "Chofer", entidadId: "4", prioridad: "alta", leida: false, fecha: new Date("2026-09-20T09:15:00") },
    { id: 2, tipo: "licencia_proxima", mensaje: "La licencia de Marisa Fernández vence en pocos días.", entidadNombre: "Marisa Fernández", entidadTipo: "Chofer", entidadId: "2", prioridad: "media", leida: false, fecha: new Date("2026-09-24T11:40:00") },
    { id: 3, tipo: "documentacion_vencida", mensaje: "El RTO / VTV del vehículo AA001BB está vencido.", entidadNombre: "AA001BB", entidadTipo: "Vehiculo", entidadId: "AA001BB", prioridad: "alta", leida: false, fecha: new Date("2026-09-11T08:00:00") },
    { id: 4, tipo: "mantenimiento_proximo", mensaje: "AF006GG tiene un service de 400.000 km programado.", entidadNombre: "AF006GG", entidadTipo: "Vehiculo", entidadId: "AF006GG", prioridad: "media", leida: true, fecha: new Date("2026-09-10T14:20:00") },
    { id: 5, tipo: "siniestro_activo", mensaje: "Hay un siniestro en proceso para el vehículo AD004EE.", entidadNombre: "AD004EE", entidadTipo: "Siniestro", entidadId: "2", prioridad: "alta", leida: false, fecha: new Date("2026-08-29T16:05:00") },
    { id: 6, tipo: "vehiculo_fuera_servicio", mensaje: "El vehículo AB002CC fue dado de baja tras un siniestro con pérdida total.", entidadNombre: "AB002CC", entidadTipo: "Vehiculo", entidadId: "AB002CC", prioridad: "media", leida: true, fecha: new Date("2025-11-10T10:00:00") },
  ]);
  console.log("✔ Alertas.");

  await Rol.bulkCreate([
    { id: 1, nombre: "Administrador", permisos: ["vehiculos", "choferes", "mantenimientos", "herramientas", "alertas", "reportes", "siniestros", "usuarios", "roles", "auditoria"], bloqueado: true },
    { id: 2, nombre: "Supervisor", permisos: ["vehiculos", "choferes", "mantenimientos", "herramientas", "alertas", "reportes", "siniestros"], bloqueado: false },
    { id: 3, nombre: "Operador", permisos: ["vehiculos", "choferes", "mantenimientos"], bloqueado: false },
  ]);
  console.log("✔ Roles.");

  await Usuario.bulkCreate([
    { id: 1, nombre: "Administrador", apellido: "Sistema", nombreUsuario: "admin", rolId: 1, activo: true, permisos: null },
    { id: 2, nombre: "Laura", apellido: "Gómez", nombreUsuario: "lgomez", rolId: 2, activo: true, permisos: ["vehiculos", "choferes", "mantenimientos", "alertas", "reportes"] },
    { id: 3, nombre: "Pablo", apellido: "Ibarra", nombreUsuario: "pibarra", rolId: 3, activo: true, permisos: ["vehiculos", "mantenimientos"] },
    { id: 4, nombre: "Julieta", apellido: "Paz", nombreUsuario: "jpaz", rolId: 3, activo: false, permisos: ["vehiculos"] },
  ]);
  console.log("✔ Usuarios.");

  await Comision.bulkCreate([
    { id: 1, nombre: "Comisión de Inspección de Obra Vial", area: "Dirección de Vialidad", comisionado: {}, integrantes: [], observaciones: "" },
    { id: 2, nombre: "Comisión de Operativos de Asistencia", area: "Defensa Civil", comisionado: {}, integrantes: [], observaciones: "" },
    { id: 3, nombre: "Comisión de Fiscalización de Establecimientos", area: "Dirección de Fiscalización", comisionado: {}, integrantes: [], observaciones: "" },
  ]);
  console.log("✔ Comisiones.");

  await Memo.bulkCreate([
    {
      id: 1, comisionId: 1, vehiculoPatente: "AF006GG", choferId: 5,
      integrantes: [{ nombre: "Ricardo Daniel Peralta", dni: "24.556.781" }, { nombre: "Walter Esteban Gómez", dni: "29.887.432" }],
      destino: "Ruta 34, km 56 - Quimilí", motivo: "Inspección de obra vial",
      fechaSalida: "2026-10-08", fechaRegreso: "2026-10-18", estado: "en_curso",
      historial: [{ fecha: "2026-10-08", accion: "Memo generado", detalle: "Reserva del vehículo para la comisión." }],
    },
    {
      id: 2, comisionId: 2, vehiculoPatente: "AH008II", choferId: 3,
      integrantes: [{ nombre: "Marcela Soledad Ríos", dni: "27.889.112" }, { nombre: "Hugo Alberto Suárez", dni: "31.223.004" }, { nombre: "Betina Noemí Acuña", dni: "33.998.221" }],
      destino: "Zona rural - Clodomira", motivo: "Operativo de asistencia",
      fechaSalida: "2026-10-20", fechaRegreso: "2026-10-25", estado: "reservado",
      historial: [{ fecha: "2026-10-12", accion: "Memo generado", detalle: "Reserva del vehículo para la comisión." }],
    },
    {
      id: 3, comisionId: 3, vehiculoPatente: "AE005FF", choferId: 1,
      integrantes: [{ nombre: "Jorge Luis Medina", dni: "22.114.567" }],
      destino: "Zona rural - Fernández", motivo: "Fiscalización de establecimientos",
      fechaSalida: "2026-08-01", fechaRegreso: "2026-08-05", estado: "finalizado", fechaRegresoReal: "2026-08-05",
      historial: [
        { fecha: "2026-08-01", accion: "Memo generado", detalle: "Reserva del vehículo para la comisión." },
        { fecha: "2026-08-05", accion: "Regreso registrado", detalle: "Vehículo restituido sin novedades." },
      ],
    },
    {
      id: 4, comisionId: 2, vehiculoPatente: "AG007HH", choferId: 5,
      integrantes: [{ nombre: "Marcela Soledad Ríos", dni: "27.889.112" }],
      destino: "Termas de Río Hondo", motivo: "Operativo conjunto de asistencia",
      fechaSalida: "2026-09-01", fechaRegreso: "2026-09-04", estado: "finalizado", fechaRegresoReal: "2026-09-04",
      historial: [
        { fecha: "2026-09-01", accion: "Memo generado", detalle: "Reserva del vehículo para la comisión." },
        { fecha: "2026-09-04", accion: "Regreso registrado", detalle: "Vehículo restituido sin novedades." },
      ],
    },
  ]);
  console.log("✔ Memos.");

  await Documento.bulkCreate([
    {
      id: 1, vehiculoPatente: "AA001BB", comisionId: null, tipo: "comodato", numero: "COM-014/2025",
      fechaEmision: "2025-03-01", fechaVencimiento: "2026-03-01",
      comodante: {
        nombre: "Gobierno de la Provincia de Santiago del Estero",
        cargo: "Ministro de Producción, Recursos Naturales, Forestación, Tierras y Medio Ambiente",
        representante: "Néstor Osvaldo Ceferino Machado Laitano", dni: "20.151.259",
        domicilio: 'Calle Andes N°30, esq. Belgrano "Complejo Manuel Belgrano", Torre Andes, 10° Piso, Santiago del Estero',
      },
      comodatario: { nombre: "Bomberos Voluntarios Zona Centro", representante: "Carlos Alberto Díaz", dni: "18.442.337", domicilio: "Av. Roca 540, Santiago del Estero" },
      localidad: "Santiago del Estero (Capital)",
      bienes: [{ cantidad: 1, tipo: "Camioneta", marca: "Toyota", modelo: "Hilux", dominio: "AA001BB" }],
      observaciones: "Uso exclusivo para tareas de prevención y asistencia comunitaria.",
      historial: [{ fecha: "2025-03-01", accion: "Documento generado", detalle: "Emisión inicial del comodato." }],
    },
    {
      id: 2, vehiculoPatente: "AC003DD", comisionId: null, tipo: "comodato", numero: "COM-009/2024",
      fechaEmision: "2024-06-01", fechaVencimiento: "2026-10-15",
      comodante: {
        nombre: "Gobierno de la Provincia de Santiago del Estero",
        cargo: "Ministro de Producción, Recursos Naturales, Forestación, Tierras y Medio Ambiente",
        representante: "Néstor Osvaldo Ceferino Machado Laitano", dni: "20.151.259",
        domicilio: 'Calle Andes N°30, esq. Belgrano "Complejo Manuel Belgrano", Torre Andes, 10° Piso, Santiago del Estero',
      },
      comodatario: { nombre: "Defensa Civil - Delegación La Banda", representante: "Marcela Soledad Ríos", dni: "27.889.112", domicilio: "Av. Belgrano 210, La Banda" },
      localidad: "La Banda",
      bienes: [{ cantidad: 1, tipo: "Camioneta", marca: "Volkswagen", modelo: "Amarok", dominio: "AC003DD" }],
      observaciones: "Próximo a vencer: gestionar renovación o restitución del vehículo.",
      historial: [{ fecha: "2024-06-01", accion: "Documento generado", detalle: "Emisión inicial del comodato." }],
    },
  ]);
  console.log("✔ Documentos.");

  await Auditoria.bulkCreate([
    { fecha: new Date("2026-09-28T08:15:00"), usuario: "admin", tabla: "vehiculos", accion: "MODIFICACION", detalle: "Actualizó el kilometraje de AA001BB a 88.000 km." },
    { fecha: new Date("2026-09-27T17:40:00"), usuario: "lgomez", tabla: "mantenimientos", accion: "ALTA", detalle: "Registró la orden de mantenimiento #3 para AD004EE." },
    { fecha: new Date("2026-09-25T09:05:00"), usuario: "admin", tabla: "choferes", accion: "MODIFICACION", detalle: "Dio de baja al chofer Diego Ríos por licencia médica." },
    { fecha: new Date("2026-09-20T10:00:00"), usuario: "admin", tabla: "siniestros", accion: "ALTA", detalle: "Registró un siniestro para el vehículo AD004EE." },
    { fecha: new Date("2026-11-10T14:30:00"), usuario: "admin", tabla: "vehiculos", accion: "BAJA", detalle: "Dio de baja al vehículo AB002CC tras pérdida total." },
    { fecha: new Date("2026-09-28T07:58:00"), usuario: "pibarra", tabla: "sesion", accion: "INICIO", detalle: "Inicio de sesión exitoso." },
  ]);
  console.log("✔ Auditoría.");

  console.log("\n✅ Base de datos instalada con datos de demostración.");
  await sequelize.close();
}

instalar().catch((err) => {
  console.error("❌ Error al instalar la base de datos:", err);
  process.exit(1);
});
