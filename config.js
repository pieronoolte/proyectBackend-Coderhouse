
// Utilizar solo en Desarollo
//require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  isDev: 'development',
  port: 8080,
  dbUrl: "mongodb://root:root123@localhost:27017?tls=false",
  dbUrlTest: process.env.MONGO_URL_TEST,
  dbName: 'Ecomerce',
  apikey: 3323254,
  jwtSecret: 'qR.Dck<:4yeAaf%$v%saYq&@/kkcNp9b_58Jx.da/Z_:KZVd@sbFy5MPAH',
  userNM: 'pieronolte@gmail.com',
  passwordNM: 'ejfj vkmt amqr qyac'
};

// Verificación de configuración mínima requerida
const requiredVars = ['env', 'port', 'dbUrl', 'dbName'];
const missingVars = requiredVars.filter(key => !config[key]);

console.log(config)
if (missingVars.length > 0) {
  console.error(`Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
}

module.exports = { config };
