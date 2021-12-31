import { Printer } from '../model/Printer.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };
    
    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static async fillFields(serialNumberUI) {
        const printers = await Printer.read();

        // preenche o modal com os valores da impressora
        printers.forEach((printer) => {
            if (printer.serial_number === serialNumberUI) {
                // Exibe somente a data eliminando hora e timezone
                if(printer.toner_last_swap !== null) {
                    printer.toner_last_swap = printer.toner_last_swap.slice(0, 10);
                }
                document.querySelector('#serialNumber_modal').value = printer.serial_number;
                document.querySelector('#manufacturer_modal').value = printer.manufacturer;
                document.querySelector('#model_modal').value = printer.model;
                document.querySelector('#tonerLastSwap_modal').value = printer.toner_last_swap;
                document.querySelector('#pageCountInstructions_modal').value = printer.page_count_instructions;
                document.querySelector('#overallCount_modal').value = printer.overall_count;
                document.querySelector('#departmentName_modal').value = printer.department_name;
                document.querySelector('#proprietorName_modal').value = printer.proprietor_name;
                document.querySelector('#tonerModel_modal').value = printer.toner_model;
            }
        });
    };

    static getValues() {
        return {
            serialNumber: document.querySelector('#serialNumber_modal').value,
            manufacturer: document.querySelector('#manufacturer_modal').value,
            model: document.querySelector('#model_modal').value,
            tonerLastSwap: document.querySelector('#tonerLastSwap_modal').value,
            pageCountInstructions: document.querySelector('#pageCountInstructions_modal').value,
            overallCount: document.querySelector('#overallCount_modal').value,
            departmentName: document.querySelector('#departmentName_modal').value,
            proprietorName: document.querySelector('#proprietorName_modal').value,
            tonerModel: document.querySelector('#tonerModel_modal').value
        }
    };

    static validateFields() {
        const { serialNumber, manufacturer, model} = this.getValues();

        if (serialNumber === ''
            || manufacturer === ''
            || model === ''
        ) {
            UI.showAlert('Por favor, preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };

    static clearFields() {
        document.querySelector('#serialNumber_modal').value = '';
        document.querySelector('#manufacturer_modal').value = '';
        document.querySelector('#model_modal').value = '';
        document.querySelector('#tonerLastSwap_modal').value = '';
        document.querySelector('#pageCountInstructions_modal').value = '';
        document.querySelector('#overallCount_modal').value = '';
        document.querySelector('#departmentName_modal').value = '';
        document.querySelector('#proprietorName_modal').value = '';
        document.querySelector('#tonerModel_modal').value = '';
    };

    static async submit(event) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if (isValid) {
                let { serialNumber, manufacturer, model, tonerLastSwap, pageCountInstructions, overallCount, departmentName, proprietorName, tonerModel} = this.getValues();

                if(tonerLastSwap === '') tonerLastSwap = null;
                if(pageCountInstructions === '') pageCountInstructions = null;
                if(overallCount === '') overallCount = null;
                if(departmentName === '') departmentName = null;
                if(proprietorName === '') proprietorName = null;
                if(tonerModel === '') tonerModel = null;

                const printers = await Printer.read();
                let id;

                printers.forEach((printer) => {
                    if (printer.serial_number === serialNumber) {
                        id = printer.id;
                    }
                });

                const updatedPrinter = {
                    id,
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

                Printer.update(updatedPrinter, id);
                location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }