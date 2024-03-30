const express = require('express');
const {createServer} = require('http');
const app = express();
const httpServer = createServer(app);
const realtimeServer = require('./realtimeServer')
const io = realtimeServer(httpServer);
const path = require('path');
const handlebars  = require('express-handlebars');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const port = process.env.PORT ||  8080;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

app.use(express.json());



app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','handlebars');

app.use(express.urlencoded({extended:true}))

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



app.use(express.static(__dirname+'/public'));
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

// Llamo al servidor de socket.io
app.set('socketio', io);

// Routes
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



mongoose.connect("mongodb://root:root123@localhost:27017?tls=false");

httpServer.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Esta funcionando en ' + port);
});


