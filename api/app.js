const createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/buyer');
const sellerRouter =require('./routes/seller')
const auctionRouter = require('./routes/bid');
const pruchaseRouter= require('./routes/purchase')
const messageRouter = require('./routes/message');
const mongoose=require('mongoose');
const cors = require('cors')
const socket = require("socket.io");

mongoose.connect(
        'mongodb://localhost:27017/useful',
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    );
mongoose.set('strictQuery',true);
const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");
});

const app = express();
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3002','http://localhost:3001/socket.io'],
  credentials: true,
}))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/buyer', usersRouter);
app.use('/seller',sellerRouter);
app.use('/auction',auctionRouter);
app.use('/message',messageRouter);
app.use('/purchases',pruchaseRouter);
const server = app.listen(3001, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
app.get('*',(req)=>{
  console.log('Request from',req.url)
})



const io = socket(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

module.exports = app;
