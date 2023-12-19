const axios = require('axios');

class BiteshipAPI {
    constructor(apiKey) {
        this.client = axios.create({
            baseURL: 'https://api.biteship.com', // Replace with the actual API base URL
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        this.couriers = "paxel,jne,jnt"; // available couriers https://biteship.com/id/docs/api/couriers/retrieve
    }

    async getRatesByCoordinates(origin, destination, catalog) {
        const bodyReq = {
            "origin_latitude": origin.latitude,
            "origin_longitude": origin.longitude,
            "destination_latitude": destination.latitude,
            "destination_longitude": destination.longitude,
            "couriers": this.couriers,
            "items": [{
                "name": catalog.name,
                "description": catalog.description,
                "value": catalog.price * 10,
                "weight": 1000,
                "quantity": 1
            }]
        }
        try {
            const response = await this.client.post(`/v1/rates/couriers`, bodyReq);
            return response.data;
        } catch (error) {
            // Handle error appropriately
            console.error(error);
            throw error;
        }
    }


    async createShipment(shipmentDetails) {
        try {
            const response = await this.client.post(`/shipments`, shipmentDetails);
            return response.data;
        } catch (error) {
            // Handle error appropriately
            console.error(error);
            throw error;
        }
    }

    // Add more methods for other API functionalities like trackOrder, manageOrder, etc.

}

module.exports = BiteshipAPI;