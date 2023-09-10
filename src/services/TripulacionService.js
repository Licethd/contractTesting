import axios from "axios"
export default class TripulacionService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    crearTripulacion = (Descripcion) => {

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/tripulacion/registro', {
                Descripcion
            },{
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }

}