//carregando os Modulos

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const crud = require('./action/crud')
const path = require("path");

const mongoose = require('mongoose'); //Para trabalhar diretamento com o MongoDB
const session = require('express-session')
const flash = require('connect-flash')



//Configurações

    //Sessão
    app.use(session({
        secret: 'marcalsession',
        resave: true,
        saveUninitialized: true,
        cookie:{secure: false}
    }))

    //Flash
    app.use(flash())

    //Middleware 9Ver o que é o Middleware
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    //Body Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //Handlebars
    app.engine('handlebars', handlebars({ defaultLayout: "main" }));
    app.set('view engine', 'handlebars');

    //Conexao com o Banco de Dados
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/marcaldb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conectado com o banco realizado com sucesso...')
    }).catch((erro) => {
        console.log('Erro ao tentar conectar com BD MongoDB: ' + erro)
    })


// Informando o local dos Arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Rotas
app.use('/admin', admin);
app.use('/crud', crud); //Rotas para CRUD



//Iniciar o servidor
const PORT = 8081;
app.listen(PORT, () => {
    console.log('Servidor Conectado');
});