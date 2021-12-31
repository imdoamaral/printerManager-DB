const url = "http://localhost:3000/api/toners";

class Toner {
    constructor(model, quant) {
        this.model = model;
        this.quant = quant;
    };

    // ----- CRUD -----

    static create(toner) {
        axios.post(url, toner)
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

    static update(updatedToner, id) {
        axios.put(`${url}/${id}`, updatedToner)
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

export { Toner }