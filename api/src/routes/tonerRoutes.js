const router = require('express-promise-router')();
const tonerController = require('../controllers/tonerController');

// Definindo as rotas CRUD - Toner

// Rota responsável por CRIAR um novo Toner: (POST) localhost:3000/api/toners
router.post('/toners', tonerController.createToner);

// Rota responsável por LISTAR todos os Toners: (GET) localhost:3000/api/toners
router.get('/toners', tonerController.listAllToners);

// Rota responsável por ENCONTRAR um Toner pelo seu ID: (GET) localhost:3000/api/toners/:id
router.get('/toners/:id', tonerController.findTonerById);

// Rota responsável por ATUALIZAR um Toner pelo seu ID: (PUT) localhost:3000/api/toners/:id
router.put('/toners/:id', tonerController.updateTonerById);

// Rota responsável por DELETAR um Toner pelo seu ID: (DELETE) localhost:3000/api/toners/:id
router.delete('/toners/:id', tonerController.deleteTonerById);

module.exports = router;