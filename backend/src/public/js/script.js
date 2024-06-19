// Chat handelbars
// eslint-disable-next-line no-undef
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');

});

socket.on("disconnect", () => {
  console.log("El socket se ha desconectado:", socket.id);
});

socket.io.on("reconnect", () => {
  console.log("Me he vuelto a conectar")
});

// eslint-disable-next-line no-undef
const send = document.querySelector('#send-message');
// eslint-disable-next-line no-undef
const allMessages = document.querySelector('#all-messages');

send.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
    const message = document.querySelector('#message');
    socket.emit("message", message.value);

    message.value="";
});

socket.on("message", ({ user, message }) => {
  // eslint-disable-next-line no-undef
    const msg = document.createRange().createContextualFragment
    (`
    <div class="message">
        <div class="message-body">
            <div class="user-info">
                <span class="username">${user}</span>
                <span class="time">Hace 1 segundo</span>
            </div>
            <p>${message}</p>
        </div>
    </div>
    `);

    allMessages.append(msg);
});
