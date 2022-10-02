const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUserInRoom } = require("./user");

io.on("connection", (socket) => {
    console.log("connection")
    socket.on("join", ({name, room}, callback) => {
        const {user, error} = addUser({ id: socket.id, name, room });
        if (error) {
         return callback(error);
        }

        socket.emit("message", { user: "admin", text: `${user.name}, chào mừng vào phòng ${user.room}`})
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} đã vào phòng`})
    
        io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) });

        socket.join(user.room);

        callback();
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", {user: user.name, text: message});
            io.to(user.room).emit("roomData", { room: user.room, users: getUserInRoom(user.room) });
        } else {
            console.log("user ko tồn tại");
        }
        callback();
    })

    socket.on("disconnection", () => {
        console.log("disconnection")
        users.removeUser(socket.id);
    })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

