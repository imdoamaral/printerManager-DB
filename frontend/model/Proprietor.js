const url = "http://localhost:3000/api/proprietors";

class Proprietor {
    constructor(name, contact) {
        this.name = name;
        this.contact = contact;
    }

    // ----- CRUD -----

    static create(proprietor) {
        axios.post(url, proprietor)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => console.log(error));
    };

    static async read() {
        const proprietors = await axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));

        return proprietors;
    };

    static update(updatedProprietor, id) {
        axios.put(`${url}/${id}`, updatedProprietor)
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

export { Proprietor }