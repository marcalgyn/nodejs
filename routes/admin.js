//Carregando os Módulos
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    //res.send('Pagina Inicial do Administrador');

    res.render('admin/index');

})


router.get('/pagamentos', (req, res) => {
    res.send('Pagina de Pagamentos');
})

//Expotar o modulo de rotas
module.exports = router;