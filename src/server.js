const express = require("express");
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const port = 3000;
const { userJoin, listUsers, userLeave, getCurrentUser, getUserById } = require("../src/module")


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

})

app.use(express.static(__dirname));

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        io.emit('user-list', listUsers);
        console.log('user disconnected');
        console.log('-------------');
    })

    //Получить события

    socket.on('user-connect', data => {
        console.log('with name: ', data.name);
        const user = userJoin(socket.id, data.name);
        io.emit('user-list', listUsers);
    })

    socket.on('on-chat', data => {
        console.log(data);
        io.emit('user-chat', data);
    })

    socket.on('send-private-message', data => {
        console.log(data);
        const userGet = getCurrentUser(data.userGet);
        const userSend = getUserById(data.userSend);
        //console.log(userSend);
        io.to(userGet.id).emit("messageReceived", {
            userSend: userSend.nameUser,
            message: data.message,
            time: data.time
        });
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})