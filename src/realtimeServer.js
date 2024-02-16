const { faker } = require('@faker-js/faker');
const MessagesService = require('./dao/models/message.dao');
const service = new MessagesService;

module.exports = hhtpServer => {

  const { Server } = require('socket.io');
  const io = new Server(hhtpServer);
  const { getProducts } = require('./routes/realTime.router');

  io.on("connection", socket => {
    // eslint-disable-next-line no-console
    console.log("id socket conectado", socket.id);
    socket.on("disconnect", () => {
      // eslint-disable-next-line no-console
      console.log("El Socket " + socket.io + " se ha desconectado");
    });


    getProducts().then((products) => {
      // eslint-disable-next-line no-console
      socket.emit("Products", products);
    });

    socket.on("newProduct", data => {
      const { nameProduct } = data;
      const { priceProduct } = data;

      socket.emit("productNew", { nameProduct, priceProduct });
    });

    socket.on("deleteProduct", data => {
      // eslint-disable-next-line no-console
      console.log(data);
      // eslint-disable-next-line no-console
      console.log(`se ha eliminado el producto de nombre ${data.title}`);
      socket.emit("productDelete", data);
    });


    const user = faker.person.firstName();
    socket.on("message", message => {
      io.emit("message", {
        user,
        message
      });
      service.createMessage({
        email: faker.internet.email(),
        username: user,
        message: message
      })
    });
  })
}
// user:faker.internet.email(),
