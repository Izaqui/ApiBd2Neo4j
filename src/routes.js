const express = require('express');

const controller = require('./sevircos/controller');
const servicos = require('./sevircos/servicos');
const ProfileController = require('./sevircos/ProfileController');
const SessionController = require('./sevircos/SessionController');

const connection = require('./database');

const routes = express.Router();

routes.post('/users', SessionController.create);

routes.get('/users', controller.index);
routes.post('/user', controller.create);

routes.get('/profile',ProfileController.index);

routes.get('/users', servicos.index);
routes.post('/users', servicos.create);
routes.delete('users/:id', servicos.deletePessoa);


module.exports = routes;