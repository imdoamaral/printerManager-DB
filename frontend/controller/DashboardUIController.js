import { Printer } from '../model/Printer.js';
import { Toner } from '../model/Toner.js';

class UI {
    static toCamelCase(printer) {
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
        `
        list.appendChild(row);
    };

    static async showTotalPrinters() {
        const printers = await Printer.read();
        const length = printers.length;

        const totalPrinters = document.querySelector('.total-printers');
        totalPrinters.innerHTML = `<strong>${length}</strong>`;
    };

    static async showInUsePrinters() {
        const printers = await Printer.read();
        let inUsePrintersCount = 0;

        printers.forEach((printer) => {
            if(printer.department_name !== null) {
                inUsePrintersCount++;
            }
        });
        console.log(inUsePrintersCount)

        const inUsePrinters = document.querySelector('.in-use-printers');
        inUsePrinters.innerHTML = `<strong>${inUsePrintersCount}</strong>`;
    };

    static async showAvailablePrinters() {
        const printers = await Printer.read();
        let availablePrintersCount = 0;

        printers.forEach((printer) => {
            if(printer.department_name === null) {
                availablePrintersCount++;
            }
        });

        const availablePrinters = document.querySelector('.available-printers');
        availablePrinters.innerHTML = `<strong>${availablePrintersCount}</strong>`;
    };
};

export { UI }