const express = require('express');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);
const path = require('path');
const handlebars = require('express-handlebars');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const { config } = require('../config');
const port = config.port;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express');


app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser("secretCode"));
require('./utils/auth');

app.use(express.static(__dirname + '/public'));


app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/pong', (req, res) => {
  res.send('ping')
})

// Routes
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const options = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:8080"
      },
    ],
  },
  apis: [`${__dirname}/docs/*.yaml`],
}
const spacs = swaggerjsdoc(options)
app.use(
  '/api-docs',
  swaggerui.serve,
  swaggerui.setup(spacs)
)


mongoose.connect(config.dbUrl)
.then(() => {
  console.log('Connected to MongoDB');
  })
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

if (require.main === module) {
  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Esta funcionando en ' + port);
  });
}

module.exports = app;
