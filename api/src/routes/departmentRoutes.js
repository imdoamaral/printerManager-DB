const router = require('express-promise-router')();
const departmentController = require('../controllers/departmentController');

// Definindo as rotas CRUD - Departamento

// Rota responsável por CRIAR um novo Departamento: (POST) localhost:3000/api/departments
router.post('/departments', departmentController.createDepartment);

// Rota responsável por LISTAR todos os Departamentos: (GET) localhost:3000/api/departments
router.get('/departments', departmentController.listAllDepartments);

// Rota responsável por ENCONTRAR um Departamento pelo seu ID: (GET) localhost:3000/api/departments/:id
router.get('/departments/:id', departmentController.findDepartmentById);

// Rota responsável por ATUALIZAR um Departamento pelo seu ID: (PUT) localhost:3000/api/departments/:id
router.put('/departments/:id', departmentController.updateDepartmentById);

// Rota responsável por DELETAR um Departamento pelo seu ID: (DELETE) localhost:3000/api/departments/:id
router.delete('/departments/:id', departmentController.deleteDepartmentById);

module.exports = router;