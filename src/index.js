const express = require('express');
const app = express();
const routes = require('./routes');
app.use(express.json());

app.use(routes);
const port = 3003;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

const db = require('./database');

app.pessoa('/usuario', db.addPessoa);
app.amizade('/usuario', db.addAmizade);
app.put('/usuario', db.up);
app.delete('/usuario/:id', db.delet);
