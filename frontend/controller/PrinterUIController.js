import { Printer } from '../model/Printer.js';
import { Toner } from '../model/Toner.js'

class UI {

    static showAlert(text, className) {
        // <div class="alert alert-danger/alert-success">Mensagem</div>
        const div = document.createElement('div');

        // prepara a estrutura pra receber o nome da classe ('success', 'danger', etc)
        div.className = `alert alert-${className}`;

        // insere algo dentro do campo 'mensagem'
        div.appendChild(document.createTextNode(text));

        // insere a mensagem de alerta antes do form
        const container = document.querySelector('.container');
        const form = document.querySelector('#printer-form');
        container.insertBefore(div, form);

        // Remove a mensagem após 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };

    static toCamelCase(printer) {
        // Retorna o nome dos atributos snake_case em camelCase
        return {
            serialNumber: printer.serial_number,
            manufacturer: printer.manufacturer,
            model: printer.model,
            tonerLastSwap: printer.toner_last_swap,
            pageCountInstructions: printer.page_count_instructions,
            overallCount: printer.overall_count,
            departmentName: printer.department_name,
            proprietorName: printer.proprietor_name,
            tonerModel: printer.toner_model
        }
    };

    static async showPrinters() {
        const printers = await Printer.read();

        printers.forEach((printer) => {
            const camelCasePrinter = UI.toCamelCase(printer);
            UI.addPrinter(camelCasePrinter);
        });
    };

    static formatFields(printer, tonerQuant) {
        // Substitui 'null' por caracteres mais intuitivos
        if (printer.tonerLastSwap === null) printer.tonerLastSwap = '?';
        if (printer.pageCountInstructions === null) printer.pageCountInstructions = '?';
        if (printer.overallCount === null) printer.overallCount = 0;
        if (printer.departmentName === null) printer.departmentName = '?';
        if (printer.proprietorName === null) printer.proprietorName = '?';
        if (tonerQuant === undefined) tonerQuant = 'Nenhum cadastrado';

        // Exibe somente a data eliminando hora e timezone
        if(printer.tonerLastSwap !== '?') {
            printer.tonerLastSwap = printer.tonerLastSwap.slice(0, 10);
        }

        return {
            serialNumber: printer.serialNumber,
            manufacturer: printer.manufacturer,
            model: printer.model,
            tonerLastSwap: printer.tonerLastSwap,
            pageCountInstructions: printer.pageCountInstructions,
            overallCount: printer.overallCount,
            departmentName: printer.departmentName,
            proprietorName: printer.proprietorName,
            tonerQuant
        }
    };

    static async addPrinter(printer) {
        const list = document.querySelector('#printer-list');

        const row = document.createElement('tr');

        // Obtém a quantidade de toners disponíveis para dada impressora
        let tonerQuant;
        const toners = await Toner.read();
        toners.forEach((toner) => {
            if(toner.model == printer.tonerModel) {
                tonerQuant = parseInt(toner.quant);
            }
        });

        const formattedPrinter = this.formatFields(printer, tonerQuant);

        row.innerHTML = `
            <td>${formattedPrinter.serialNumber}</td>
            <td>${formattedPrinter.manufacturer}</td>
            <td>${formattedPrinter.model}</td>
            <td>${formattedPrinter.tonerLastSwap}</td>
            <td>${formattedPrinter.pageCountInstructions}</td>
            <td>${formattedPrinter.overallCount}</td>
            <td>${formattedPrinter.departmentName}</td>
            <td>${formattedPrinter.proprietorName}</td>
            <td>${formattedPrinter.tonerQuant}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="#" class="btn btn-info btn-sm edit">Edit</a></td>
        `
        list.appendChild(row);
    };

    static removePrinter(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    };
};

export { UI }