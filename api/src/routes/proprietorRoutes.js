const router = require('express-promise-router')();
const proprietorController = require('../controllers/proprietorController');

// Definindo as rotas CRUD - Proprietário

// Rota responsável por CRIAR um novo Proprietário: (POST) localhost:3000/api/proprietors
router.post('/proprietors', proprietorController.createProprietor);

// Rota responsável por LISTAR todos os Proprietários: (GET) localhost:3000/api/proprietors
router.get('/proprietors', proprietorController.listAllProprietors);

// Rota responsável por ENCONTRAR um Proprietário pelo seu ID: (GET) localhost:3000/api/proprietors/:id
router.get('/proprietors/:id', proprietorController.findProprietorById);

// Rota responsável por ATUALIZAR um Proprietário pelo seu ID: (PUT) localhost:3000/api/proprietors/:id
router.put('/proprietors/:id', proprietorController.updateProprietorById);

// Rota responsável por DELETAR um Proprietário pelo seu ID: (DELETE) localhost:3000/api/proprietors/:id
router.delete('/proprietors/:id', proprietorController.deleteProprietorById);

module.exports = router;