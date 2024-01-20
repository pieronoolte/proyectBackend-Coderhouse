const express = require('express');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const app = express();
const port = process.env.PORT ||  8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is my server in Express')
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Esta funcionando en ' + port);
});
