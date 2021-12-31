import { Printer } from './model/Printer.js';
import { Modal } from './controller/PrinterModalController.js';
import { UI } from './controller/PrinterUIController.js';
import { Form } from './controller/PrinterFormController.js';
import { Department } from './model/Department.js';
import { Toner } from './model/Toner.js';
import { Proprietor } from './model/Proprietor.js';


// ----- CARREGAMENTOS -----

const loadDepartments = async () => {
    const selectDepartmentName = document.querySelector('#departmentName');
    const departments = await Department.read();

    departments.forEach((department) => {
        selectDepartmentName.add(
            new Option(department.name)
        );
    });
};
loadDepartments();

const loadToners = async () => {
    const selectTonerModel = document.querySelector('#tonerModel');
    const toners = await Toner.read();

    toners.forEach((toner) => {
        selectTonerModel.add(
            new Option(toner.model)
        );
    });
}
loadToners();

const loadPoprietors = async () => {
    const selectProprietor = document.querySelector('#proprietorName');
    const proprietors = await Proprietor.read();
    
    proprietors.forEach((proprietor) => {
        selectProprietor.add(
            new Option(proprietor.name)
        );
    });
}
loadPoprietors();

// ----- EVENTOS -----

// Evento: Listar impressoras
document.addEventListener('DOMContentLoaded', UI.showPrinters);

// Evento: Adicionar uma impressora
document.querySelector('#printer-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar uma impressora
document.querySelector('#printer-list').addEventListener('click', (event) => {
    // remover
    if (event.target.classList.contains('delete')) {
        const serialNumberUI = event.target.parentElement.parentElement.firstElementChild.textContent
        Printer.delete(serialNumberUI);
        UI.removePrinter(event.target);
        UI.showAlert('Impressora deletada', 'success');
    }

    // editar
    if (event.target.classList.contains('edit')) {
        const loadDepartmentsModal = async () => {
            const selectDepartmentNameModal = document.querySelector('#departmentName_modal');
            const departmentsModal = await Department.read();
        
            departmentsModal.forEach((department) => {
                selectDepartmentNameModal.add(
                    new Option(department.name)
                );
            });
        };
        loadDepartmentsModal();

        const loadTonersModal = async () => {
            const selectTonerModelModal = document.querySelector('#tonerModel_modal');
            const tonersModal = await Toner.read();

            tonersModal.forEach((toner) => {
                selectTonerModelModal.add(
                    new Option(toner.model)
                );
            });
        }
        loadTonersModal();

        // Carrega os proprietários (na janela de edição)
        const loadPoprietorsModal = async () => {
            const selectProprietorModal = document.querySelector('#proprietorName_modal');
            const proprietorsModal = await Proprietor.read();
            
            proprietorsModal.forEach((proprietor) => {
                selectProprietorModal.add(
                    new Option(proprietor.name)
                );
            });
        }
        loadPoprietorsModal();

        // Edita os dados do elemento clicado
        const serialNumberUI = event.target.parentElement.parentElement.firstElementChild.textContent;

        Modal.open();
        Modal.fillFields(serialNumberUI);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, serialNumberUI);
            Modal.close();
        });
    }
});