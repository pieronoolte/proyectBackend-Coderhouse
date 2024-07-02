
// Utilizar solo en Desarollo
//require('dotenv').config();

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
const requiredVars = ['env', 'port', 'dbUrl', 'dbName'];
const missingVars = requiredVars.filter(key => !config[key]);

console.log(config)
if (missingVars.length > 0) {
  console.error(`Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
}

module.exports = { config };
