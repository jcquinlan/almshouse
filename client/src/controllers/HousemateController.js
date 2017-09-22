import axios from 'axios';

class HousemateController {
    createSelf(options) {
        return axios.post('/housemates/self', options);
    }

    createHousemate(options) {
        return axios.post('/housemates', options);
    }

    getSelf(options) {
        return axios.get('/me');
    }
}

export default new HousemateController();