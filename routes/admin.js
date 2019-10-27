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

//Visualizar Registro
router.get("/vis-cat-pagamento/:id", (req, res) => {

    CatPagamento.findOne({ _id: req.params.id }).then((catpagamento) => {
        res.render("admin/vis-cat-pagamento", { catpagamento: catpagamento })
    }).catch((erro) => {
        req.flash('error_msg', 'Categoria de pagamento nao Encontrada ')
        res.redirect('/admin/cat-pagamentos')
    })

})

router.get('/cad-cat-pagamento', (req, res) => {
    res.render('admin/cad-cat-pagamento');
})


router.post('/add-cat-pagamento', (req, res) => {
    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: 'Necessario preencher o campo nome' })
    }

    if (errors.length > 0) {
        res.render("admin/cad-cat-pagamento", { errors: errors })
    } else {
        const addCatPagamento = {
            nome: req.body.nome

        }

        new CatPagamento(addCatPagamento).save().then(() => {
            req.flash("success_msg", 'Reistro salvo com sucesso')
            res.redirect('/admin/cat-pagamentos')
        }).catch((erro) => {
            req.flash('error_msg', 'Registro nao pode ser inserido')

        })
    }
})


router.get('/edit-cat-pagamento/:id', (req, res) => {
    CatPagamento.findOne({ _id: req.params.id }).then((catpagamento) => {
        res.render("admin/edit-cat-pagamento", { catpagamento: catpagamento })
    }).catch((erro) => {
        req.flash('error_msg', 'Categoria de pagamento nao encontrada')
        res.redirect('/admin/cat-pagamentos')
    })

})

//Editar Registro
router.post('/update-cat-pagamento', (req, res) => {
    CatPagamento.findOne({ _id: req.body.id }).then((catpagamento) => {
        catpagamento.nome = req.body.nome

        catpagamento.save().then(() => {
            req.flash('success_msg', 'Categoria de pagamento Editada com sucesso!! ')
            res.redirect('/admin/cat-pagamentos')
        }).catch((erro) => {
            req.flash('error_msg', 'Categoria de pagamento nao Editada ')
            res.redirect('/admin/cat-pagamentos')
        })
    }).catch((erro) => {
        req.flash('error_msg', 'Categoria de pagamento nao encontrada')
        res.redirect('/admin/cat-pagamentos')
    })
})

//Deletar Registro
router.get('/del-cat-pagamento/:id', (req, res) => {

    CatPagamento.findOne({ _id: req.body.id }).then((catpagamento) => {

        CatPagamento.deleteOne({ _id: req.params.id }).then(() => {
            req.flash('success_msg', 'Categoria Apagada com Sucesso!! ')
            res.redirect('/admin/cat-pagamentos')
        }).catch((erro) => {
            req.flash('error_msg', 'Categoria de pagamento nao Apagada ')
            res.redirect('/admin/cat-pagamentos')
        })


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

//Gravar Cadastrar Pagamento
router.post('/add-pagamento', (req, res) => {

    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: 'Necessário preencher o campo nome' })
    }

    if (!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null) {
        errors.push({ error: 'Necessário preencher o campo Valor' })
    }

    if (!req.body.catpagamento || typeof req.body.catpagamento == undefined || req.body.catpagamento == null) {
        errors.push({ error: 'Necessário preencher Categoria de pagamento' })
    }

    if (errors.length > 0) {
        res.render('admin/cad-pagamento', { errors: errors })
    } else {
        const addPagamento = {
            nome: req.body.nome,
            valor: req.body.valor,
            catpagamento: req.body.catpagamento
        }

        new Pagamento(addPagamento).save().then(() => {
            req.flash('success_msg', 'Pagamento Cadastrado com sucesso')
            res.redirect('/admin/pagamentos')

        }).catch((erro) => {
            req.flash('error_msg', 'Pagamento não foi cadastrado com sucesso! ' + erro)
            res.redirect('/admin/cad-pagamento')
        })
    }


})

//Criar rota editar Pagamento
router.get('/edit-pagamento/:id', (req, res) => {
    // 

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


//Editar e Salvar valor no banco

router.post('/update-pagamento', (req, res) => {

    Pagamento.findOne({ _id: req.body.id }).then((pagamento) => {
        pagamento.nome = req.body.nome,
            pagamento.valor = req.body.valor,
            pagamento.catpagamento = req.body.catpagamento

        pagamento.save().then(() => {
            req.flash('success_msg', 'Pagamento Editado com sucesso!! ')
            res.redirect('/admin/pagamentos')
        }).catch((erro) => {
            req.flash('error_msg', 'Pagamento não Editado ' + erro)
            res.redirect('/admin/pagamentos')
        })
    }).catch((erro) => {
        req.flash('error_msg', 'Pagamento não encontrado' + erro)
        res.redirect('/admin/pagamentos')
    })
})

//Apagar registro de Pagamento
//Deletar Registro
router.get('/del-pagamento/:id', (req, res) => {

    Pagamento.findOne({ _id: req.body.id }).then((pagamento) => {

        Pagamento.deleteOne({ _id: req.params.id }).then(() => {
            req.flash('success_msg', 'Pagamento Apagado com Sucesso!! ')
            res.redirect('/admin/pagamentos')
        }).catch((erro) => {
            req.flash('error_msg', 'Pagamentos nao Apagada ')
            res.redirect('/admin/pagamentos')
        })


    })
})

//Rota de Visualiza Pagamento
//Visualizar Registro
router.get("/vis-pagamento/:id", (req, res) => {

    Pagamento.findOne({ _id: req.params.id }).populate('catpagamento').then((pagamento) => {
        res.render("admin/vis-pagamento", { pagamento: pagamento })
    }).catch((erro) => {
        req.flash('error_msg', 'Pagamento nao Encontrada ')
        res.redirect('/admin/cat-pagamentos')
    })

})

//Listar Usuario
router.get('/usuarios', (req, res) => {
    res.render('admin/usuarios')
})


//Cadastar Usuario
router.get('/cad-usuario', (req, res) => {
    res.render('admin/cad-usuario')
})


//Rota de Cadastrar Usuario

router.post('/add-usuario', (req, res) => {
    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Erro: nescessario informar o nome" })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        errors.push({ error: "Erro: nescessario informar o e-mail" })
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        errors.push({ error: "Erro: nescessario informar a Senha" })
    }
    if (!req.body.rep_senha || typeof req.body.rep_senha == undefined || req.body.rep_senha == null) {
        errors.push({ error: "Erro: nescessario repetir a senha" })
    }

    if (req.body.senha != req.body.rep_senha) {
        errors.push({ error: "Erro: Senhas são diferentes" })
    }

    if (req.body.senha.length < 6) {
        errors.push({ error: "Erro: Senhas muito Fraca" })
    }

    if (errors.length > 0) {
        res.render('admin/cad-usuario', { errors: errors })
    } else {
        Usuario.findOne({ email: req.body.email }).then((usuario) => {

            if (usuario) {
                req.flash('error_msg', 'Erro: Este e-mail já está cadastrado')
                res.redirect('/admin/cad-usuario')
            } else {
                const addUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcryptjs.genSalt(10, (erro, salt) => {
                    bcryptjs.hash(addUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash('error_msg', 'Erro: não foi possivel cadastrar entre em contato com o administrador')
                            res.redirect('/admin/cad-usuario')
                        } else {
                            addUsuario.senha = hash
                            addUsuario.save().then(() => {
                                req.flash('success_msg', 'usuario Cadastrado com Sucesso')
                                res.redirect('/admin/usuarios')
                            }).catch((erro) => {
                                req.flash('error_msg', 'Erro: Não foi possivél cadastrar entre em contato com o Administrador')
                                res.redirect('/admin/usuarios')
                            })

                        }
                    })
                })
            }
        }).catch((erro) => {
            req.flash('error_msg', 'Erro: Não foi possivél cadastrar entre em contato com o Administrador')
            res.redirect('/admin/usuarios')
        })
    }

})


//Expotar o modulo de rotas
module.exports = router;