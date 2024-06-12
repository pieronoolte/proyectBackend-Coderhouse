const express = require('express');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);
const realtimeServer = require('./realtimeServer')
const io = realtimeServer(httpServer);
const path = require('path');
const handlebars = require('express-handlebars');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const mime = require('mime');
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express');
// const { options } = require('joi');
const nodemailer = require('nodemailer')
app.use(express.json());

// const swaggerOptions = {
//   definition:{
//     openapi: '3.0.3',
//     info: {
//       title: "Backend First Coder House",
//       description: "Documentación del proyecto"
//     }
//   },
//   apis: [`${__dirname}/documentation.yaml`]
// }


const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth:{
    user: 'pieronolte@gmail.com',
    pass: 'ejfj vkmt amqr qyac'
  }
})



app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser("secretCode"));
require('./utils/auth');
// app.use(session({
//   store: MongoStore.create({
//     mongoUrl:"mongodb://root:root123@localhost:27017?tls=false",
//     // mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
//     ttl:15,
//   }),
//   secret: "secretCode",
//   resave: false,
//   saveUninitialized: false
// }))


// const swaggerJSDoc = require('swagger-jsdoc');
// const collection = require("../../../BackendFirst.postman_collection.json"); // any Postman collection JSON file
// const { transpile } = require("postman2openapi");

// // Returns a JavaScript object representation of the OpenAPI definition.
// const openapi = transpile(collection);

// console.log(JSON.stringify(openapi, null, 2));


app.use(express.static(__dirname + '/public'));
app.use('/realTimeProducts', express.static(path.join(__dirname, 'public')));
// Pruebas
// app.get('/', (req, res) => {
//   let testUser = {
//     name: "Hilda",
//     last_name: "Martinez"
//   }
//   res.render('index', testUser);
// })

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/pong', (req, res) => {
  res.send('ping')
})

app.get('/mail', async (req, res) => {
  let imagePath = path.join(__dirname, 'public', 'images', 'imageMail.png');
  let result = await transport.sendMail({
    from: 'pieronolte@gmail.com',
    to: 'pieronolte@gmail.com',
    subject: 'Correo de prueba',
    html:
    `<div>
    <h1> Este es un test!</h1>
    <img src="cid:imageMail"/>
    </div>`,
    attachments: [{
      filename:' imageMail.png',
      path: imagePath,
      cid:'imageMail'
    }]
  })

  res.send({status: "success", result:" Email sent"})
})


// Llamo al servidor de socket.io
app.set('socketio', io);

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


mongoose.connect("mongodb://root:root123@localhost:27017?tls=false")
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
