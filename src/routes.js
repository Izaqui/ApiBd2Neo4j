const express = require('express');

//const User = require('./controllers/User');
const servicos = require('./sevircos/servicos');

//const connection = require('./database');

const routes = express.Router();

//routes.get('/profile',User.index);

routes.indexUser('/users', servicos.index);
routes.createUser('/users',servicos.create)
routes.friends('/users', servicos.newFriends);
routes.delete('users/:email', servicos.delete);


module.exports = routes;