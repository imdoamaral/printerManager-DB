import { UI } from './controller/TonerUIController.js'
import { Form } from './controller/TonerFormController.js'
import { Toner } from './model/Toner.js'
import { Modal } from './controller/TonerModalController.js'

// ----- EVENTOS -----

// Evento: Listar toners
document.addEventListener('DOMContentLoaded', UI.showToners);

// Evento: Adicionar um toner
document.querySelector('#toner-form').addEventListener('submit', (event) => {
    Form.submit(event);
});

// Evento: Remover/Editar um toner
document.querySelector('#toner-list').addEventListener('click', (event) => {
    // remover
    if(event.target.classList.contains('delete')) {
        const id = event.target.parentElement.parentElement.firstElementChild.textContent;
        Toner.delete(id);
        UI.removeToner(event.target);
        UI.showAlert('Toner deletado', 'success');
    }

    // editar
    if(event.target.classList.contains('edit')) {
        const id = parseInt(event.target.parentElement.parentElement.firstElementChild.textContent);

        Modal.open();
        Modal.fillFields(id);

        document.querySelector('#modal-form').addEventListener('submit', (event) => {
            Modal.submit(event, id);
            Modal.close();
        });
    };
});
