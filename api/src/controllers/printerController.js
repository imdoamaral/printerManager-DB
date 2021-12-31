const { restart } = require('nodemon');
const { parse } = require('pg-protocol');
const db = require('../config/database');

// Método responsável por CRIAR uma nova Impressora
exports.createPrinter = async (req, res) => {
    const { 
        serialNumber,
        manufacturer,
        model,
        tonerLastSwap,
        pageCountInstructions,
        overallCount,
        departmentName,
        proprietorName,
        tonerModel
    } = req.body;

    const { rows } = await db.query(
        `INSERT INTO printers (
            serial_number, 
            manufacturer, 
            model, 
            toner_last_swap, 
            page_count_instructions, 
            overall_count, 
            department_name, 
            proprietor_name, 
            toner_model
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            serialNumber, 
            manufacturer, 
            model, 
            tonerLastSwap, 
            pageCountInstructions, 
            overallCount, 
            departmentName, 
            proprietorName, 
            tonerModel
        ]
    );

    res.status(201).send({
        message: "Printer added successfully!",
        body: {
            printer: { 
                serialNumber,
                manufacturer, 
                model,
                tonerLastSwap,
                pageCountInstructions,
                overallCount,
                departmentName,
                proprietorName,
                tonerModel
            }
        },
    });
};

// Método responsável por LISTAR todas as impressoras
exports.listAllPrinters = async (req, res) => {
    const response = await db.query('SELECT * FROM printers ORDER BY manufacturer ASC');
    
    res.status(200).send(response.rows);
};

// Método responsável por ENCONTRAR uma Impressora pelo seu ID
exports.findPrinterById = async (req, res) => {
    const printerId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM printers WHERE id = $1', [printerId]);

    res.status(200).send(response.rows);
}

// Método responsável por ATUALIZAR uma Impressora pelo seu ID
exports.updatePrinterById = async (req, res) => {
    const printerId = parseInt(req.params.id);
    const { 
        serialNumber,
        manufacturer,
        model,
        tonerLastSwap,
        pageCountInstructions,
        overallCount,
        departmentName,
        proprietorName,
        tonerModel
    } = req.body;

    const response = await db.query(
        `UPDATE printers SET 
            serial_number = $1, 
            manufacturer = $2, 
            model = $3, 
            toner_last_swap = $4, 
            page_count_instructions = $5, 
            overall_count = $6, 
            department_name = $7, 
            proprietor_name = $8, 
            toner_model = $9
        WHERE 
            id = $10`,
        [
            serialNumber, 
            manufacturer, 
            model, 
            tonerLastSwap, 
            pageCountInstructions, 
            overallCount, 
            departmentName, 
            proprietorName, 
            tonerModel,
            printerId
        ]
    );

    res.status(200).send({ message: "Printer updated successfully!" });
};

// Método responsável por DELETAR uma Impressora pelo seu ID
exports.deletePrinterById = async (req, res) => {
    const printerId = parseInt(req.params.id);
    await db.query(
        "DELETE FROM printers WHERE id = $1",
        [printerId]
    );

    res.status(200).send({ message: 'Printer deleted successfully!' });
};