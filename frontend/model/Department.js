const url = "http://localhost:3000/api/departments";

class Department {
    constructor(name, inCharge) {
        this.name = name;
        this.inCharge = inCharge;
    };

    // ----- CRUD -----

    static create(department) {
        axios.post(url, department)
        .then(response => {
            console.log(JSON.stringify(response.data));
        });
    };

    static async read() {
        const response = await axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));

        return response;
    };

    static update(updatedDepartment, id) {
        axios.put(`${url}/${id}`, updatedDepartment)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => console.log(error));
    };

    static delete(id) {
        axios.delete(`${url}/${id}`)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => console.log(error));
    };
};

export { Department }