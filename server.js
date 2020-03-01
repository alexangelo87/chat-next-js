const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
let port = 3000;

let mensagens = [];

io.on('connect', socket => {
    socket.emit('now', 'conectado');
    socket.broadcast.emit('novo', 'novo cliente conectado')
    socket.on('mensagem', message => {
        mensagens.push(message)
        socket.broadcast.emit('mensagem', mensagens);
    });
});



nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    })
});
