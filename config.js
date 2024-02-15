require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3021,
  dbUrl: process.env.MONGO_URL || 'mongodb://root:root123@localhost:27017?tls=false',
  dbName: process.env.MONGO_DB_NAME || 'Ecomerce',
};

module.exports = { config };
