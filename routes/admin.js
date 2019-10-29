//Carregando os Módulos
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')


require('../models/CatPagamento')
const CatPagamento = mongoose.model('catpagamento');

require('../models/Pagamento')
const Pagamento = mongoose.model('pagamento')

require('../models/Usuario')
const Usuario = mongoose.model('usuario');


router.get('/', (req, res) => {
    res.render('admin/index');
})



router.get('/cat-pagamentos', (req, res) => {
    //Listando registro do Bando de dados
    CatPagamento.find().then((catpagamento) => {
        res.render('admin/cat-pagamentos', { catpagamentos: catpagamento })
    }).catch((erro) => {
        req.flash('error_msg', 'Categoria de pagmento nao encontrado!')
    })

})



router.get('/cad-cat-pagamento', (req, res) => {
    res.render('admin/cad-cat-pagamento');
})

//Abre Formulario de Edição de Categoria pagamento
router.get('/edit-cat-pagamento/:id', (req, res) => {
    CatPagamento.findOne({ _id: req.params.id }).then((catpagamento) => {
        res.render("admin/edit-cat-pagamento", { catpagamento: catpagamento })
    }).catch((erro) => {
        req.flash('error_msg', 'Categoria de pagamento nao encontrada')
        res.redirect('/admin/cat-pagamentos')
    })

})


//Lista Pagamentos
router.get('/pagamentos', (req, res) => {
    //Listando registro do Bando de dados
    Pagamento.find().populate('catpagamento').then((pagamentos) => {
        res.render('admin/pagamentos', { pagamentos: pagamentos })
    }).catch((erro) => {
        req.flash('error_msg', 'Pagmento nao encontrado!')
        res.render('admin/pagamentos')
    })
})


//Cadastrar Pagamento
router.get('/cad-pagamento', (req, res) => {

    CatPagamento.find().then((catpagamento) => {
        res.render('admin/cad-pagamento', { catpagamentos: catpagamento })
    }).catch((erro) => {
        req.flash('error_msg', 'Formulario cadastra pagamento não pode ser carregado')
        res.redirect('/admin/pagamentos')
    })
})


//Criar rota editar Pagamento
router.get('/edit-pagamento/:id', (req, res) => {
    Pagamento.findOne({ _id: req.params.id }).populate('catpagamento').then((pagamento) => {
        CatPagamento.find().then((catpagamentos) => {
            res.render('admin/edit-pagamento', { pagamento: pagamento, catpagamentos: catpagamentos })
        }).catch((error) => {
            req.flash('error_msg', 'Pagamento não é possivél carregar o formulario Editar Pagamento' + erro)
            res.redirect('/admin/pagamentos')
        })

    }).catch((erro) => {
        req.flash('error_msg', 'Pagamento não é possivél carregar o formulario Editar Pagamento' + erro)
        res.redirect('/admin/pagamentos')
    })
})



//Listar Usuario
router.get('/usuarios', (req, res) => {

    Usuario.find().then((usuarios) => {

        res.render('admin/usuarios', { usuarios: usuarios })

    }).catch((erro) => {
        req.flash('error_msg', 'Usuarios não encontrado!' + erro)
        res.render('admin/usuarios')
    })

})

//Cadastar Usuario
router.get('/cad-usuario', (req, res) => {
    res.render('admin/cad-usuario')
})





//Criar rota editar Pagamento
router.get('/edit-usuario/:id', (req, res) => {
    Usuario.findOne({ _id: req.params.id }).then((usuario) => {
        res.render('admin/edit-usuario', { usuario: usuario })
    }).catch((erro) => {
        req.flash('error_msg', 'Usuario não é possivél carregar o formulario Editar Esuario' + erro)
        res.redirect('/admin/usuarios')
    })
})



//Expotar o modulo de rotas
module.exports = router;