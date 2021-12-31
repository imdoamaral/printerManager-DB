import { Department } from '../model/Department.js';

class Modal {
    static open() {
        document.querySelector('.modal').style.display = 'block';
    };
    
    static close() {
        document.querySelector('.modal').style.display = 'none';
    };

    static async fillFields(receivedId) {
        const departments = await Department.read();
    
        // preencher o modal com os valores de Departamento
        departments.forEach((department) => {
            if(department.id === receivedId) {
                document.querySelector('#depName_modal').value = department.name;
                document.querySelector('#inCharge_modal').value = department.in_charge;
            }
        });
    };
    
    static getValues() {
        return {
            name: document.querySelector('#depName_modal').value,
            inCharge: document.querySelector('#inCharge_modal').value,
        }
    };
    
    static validateFields() {
        const { name, inCharge } = this.getValues();
    
        if(name === '' || inCharge === '') {
            UI.showAlert('Por favor preencha todos os campos', 'danger');
            return false;
        }
        return true;
    };
    
    static clearFields() {
        document.querySelector('#depName_modal').value = '';
        document.querySelector('#inCharge_modal').value = '';
    };

    static submit(event, receivedId) {
        event.preventDefault();

        try {
            const isValid = this.validateFields();

            if(isValid) {
                const { name, inCharge } = this.getValues();

                const updatedDepartment = {
                    id: receivedId,
                    name,
                    inCharge
                }

                Department.update(updatedDepartment, receivedId);
                location.reload();
            }
            
        } catch (error) {
            alert(error.message);
        }
    };
};

export { Modal }