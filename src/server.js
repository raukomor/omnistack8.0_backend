const express = require('express');
const mongoose = require('mongoose');
const cors = require('Cors');


const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {
    
}

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    // connectedUsers[ID_USUARIO] = socket.id;
 
    //console.log(user, socket.id);

    connectedUsers[user] = socket.id;

    //escutando o frontend
    // socket.on('hello', message =>{
    //     console.log(message)
    // })

    //mandando msg pro front
    // setTimeout(() => {
    //     socket.emit('world', {
    //         message: 'OmniStack'
    //     });
    // }, 5000)
});


//Conexão com o banco
mongoose.connect('mongodb+srv://raukomor:raukomor@cluster0-nn7il.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);