const express = require('express');
const mongoose = require('mongoose');
const cors = require('Cors');


const routes = require('./routes');

const server = express();

//Conexão com o banco
mongoose.connect('mongodb+srv://raukomor:raukomor@cluster0-nn7il.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);