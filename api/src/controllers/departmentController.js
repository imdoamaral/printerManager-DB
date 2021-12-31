const { restart } = require('nodemon');
const { parse } = require('pg-protocol');
const db = require('../config/database');

// Método responsável por CRIAR um novo Departamento
exports.createDepartment = async (req, res) => {
    const {
        name, 
        inCharge
    } = req.body;

    await db.query(
        `INSERT INTO departments(
            name,
            in_charge
        ) VALUES ($1, $2)`,
        [
            name,
            inCharge
        ]
    );

    res.status(201).send({
        message: 'Department added successfully!',
        body: {
            department: {
                name,
                inCharge
            }
        }
    });
};

// Método responsável por LISTAR todos os Departamentos
exports.listAllDepartments = async (req, res) => {
    const response = await db.query('SELECT * FROM departments ORDER BY name ASC');
    res.status(200).send(response.rows);
};

// Método responsável por ENCONTRAR um Departamento pelo seu ID
exports.findDepartmentById = async (req, res) => {
    const departmentId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM departments WHERE id = $1', [departmentId]);

    res.status(200).send(response.rows);
};

// Método responsável por ATUALIZAR um Departamento pelo seu ID
exports.updateDepartmentById = async (req, res) => {
    const departmentId = parseInt(req.params.id);
    const { name, inCharge } = req.body;

    await db.query(
        `UPDATE departments SET
            name = $1,
            in_charge = $2
        WHERE
            id = $3`,
        [
            name,
            inCharge,
            departmentId
        ]
    );

    res.status(200).send({ message: 'Department updated successfully!' });
};

// Método responsável por DELETAR um Departamento pelo seu ID
exports.deleteDepartmentById = async (req, res) => {
    const departmentId = parseInt(req.params.id);
    await db.query('DELETE FROM departments WHERE id = $1', [departmentId]);

    res.status(200).send({ message: 'Department deleted successfuly!' });
};