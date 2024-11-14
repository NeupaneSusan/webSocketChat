const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const checkLogin = require("./middleware/login_check");
const http = require('http');


const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const socket = io.of('/chatApplication');
const port = 8080;

const userModel = require("./model/userModel");
const chatModel = require("./model/chatModel");

const loginRoutes = require("./routes/loginRoute");
const registerRoutes = require("./routes/registerRoute");
const logoutRoutes = require('./routes/logoutRoute');
const dashboardRoutes = require("./routes/dashboard");
const chatController = require("./routes/chat");

const cors = require('cors');



app.set("view engine", "ejs");
app.set("views", './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key_',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/chat_application'
    })


}));
app.use(cors())

app.use("/login", loginRoutes);

app.use('/register', registerRoutes);

app.use('/logout', logoutRoutes);

app.use('/dashboard', checkLogin, dashboardRoutes);

app.use('/chat', checkLogin, chatController);







socket.on('connection', async function (socket) {
    try {
        const userId = socket.handshake.auth.token;
        console.log(userId);
        await userModel.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '1' } });
        console.log('user connected');
        console.log(userId);
        /// user broadcast online status
        socket.broadcast.emit('getOnlineUser', { user_id: userId });

        socket.on('disconnect', async function () {
            await userModel.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '0' } });
            // user broadcast online status
            socket.broadcast.emit('getOfflineUser', { user_id: userId });
            console.log('disconnected');
        });

        socket.on('newChat', function (data) {
            socket.broadcast.emit('loadNewChat', data);
        });

        socket.on('getOldChat', async function (data) {
            const chat = await chatModel.find(({
                $or: [
                    { sender_id: data.sender_id, receiver_id: data.receiver_id },
                    { sender_id: data.receiver_id, receiver_id: data.sender_id }
                ]
            }));
            socket.emit('loadOldChat', { chat: chat })
        });
    } catch (error) {
        console.log(error);
    }
})


server.listen(port, async (error) => {
    const value = await mongoose.connect('mongodb://localhost:27017/chat_application');
    if (error) {
        return console.log(error);
    }
    console.log(`http://localhost:${port}`);
})



