//carregando os Modulos

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');

const mongoose = require('mongoose');

const path = require("path");

//Configurações
    //Body Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //Handlebars
    app.engine('handlebars', handlebars({ defaultLayout: "main" }));
    app.set('view engine', 'handlebars');

    //Conexao com o Banco de Dados
    mongoose.connect('mongodb://localhost/celke', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conectado com o banco realizado com sucesso...')
    }).catch((err) => {
        console.log('Erro conexao com MongoDB: ' + erro)
    })


// Informando o local dos Arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Rotas
app.use('/admin', admin);




//Iniciar o servidor
const PORT = 8081;
app.listen(PORT, () => {
    console.log('Servidor Conectado');
});