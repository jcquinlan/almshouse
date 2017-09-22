const axios = require('axios');
const apiConfig = require('../api');
const jwtDecode = require('jwt-decode');

class ManagementController {
    constructor() {
        this.token = null;
    }

    getNewToken(id_token) {
        const _this = this;

        return axios.post(
            `${apiConfig.APP_URL}/oauth/token`, // Url
            this.generateManagementTokenBody(), // Body
            this.generateManagementTokenHeaders(id_token) // Headers
        )
    }

    generateManagementTokenBody() {
        const { APP_URL, NONINTERACTIVE_CLIENT_ID, NONINTERACTIVE_CLIENT_SECRET } = apiConfig;

        return {
            grant_type: "client_credentials",
            client_id: NONINTERACTIVE_CLIENT_ID,
            client_secret: NONINTERACTIVE_CLIENT_SECRET,
            audience: `${APP_URL}/api/v2/`
        }
    }

    generateManagementTokenHeaders(id_token) {
        return { Authorization: `Bearer ${id_token}` }
    }
}

module.exports = new ManagementController();