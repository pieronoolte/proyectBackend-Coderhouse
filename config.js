
// Utilizar solo en Desaroollogit add .
// require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  isDev: 'development',
  port: process.env.PORT,
  dbUrl: process.env.MONGO_URL,
  dbUrlTest: process.env.MONGO_URL_TEST,
  dbName: process.env.MONGO_DB_NAME,
  apikey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  userNM: process.env.USER_NODEMAILER,
  passwordNM: process.env.PASSWORD_NODEMAILER
};

// Verificación de configuración mínima requerida
const requiredVars = ['NODE_ENV', 'PORT', 'MONGO_URL', 'MONGO_DB_NAME'];
const missingVars = requiredVars.filter(key => !config[key]);

if (missingVars.length > 0) {
  console.error(`Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
}

module.exports = { config };
