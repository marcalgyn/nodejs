//Carregando os Módulos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

require('../models/CatPagamento')

const CatPagamento = mongoose.model('catpagamento');


router.get('/', (req, res) => {
    //res.send('Pagina Inicial do Administrador');

    res.render('admin/index');

})

router.get('/pagamentos', (req, res) => {
    res.send('Pagina de Pagamentos');
})

router.get('/cat-pagamentos', (req, res) => {
    res.render('admin/cat-pagamentos');
})


router.get('/cad-cat-pagamento', (req, res) => {
    res.render('admin/cad-cat-pagamento');
})


router.post('/add-cat-pagamento', (req, res) => {
    
    const addCatPagamento = {
        nome: req.body.nome        
    
    }

    new CatPagamento(addCatPagamento).save().then(() => {
        console.log('Reistro salvo com sucesso')
        
    }).catch((erro) =>{
        console.log('Registro nao pode ser inserido' + erro)
    
    })
})


//Expotar o modulo de rotas
module.exports = router;