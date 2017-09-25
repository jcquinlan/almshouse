import axios from 'axios';

class AuthController {
    updateMetadata(userId, name, metadata) {
        return axios.patch(
            `https://almshouse.auth0.com/api/v2/users/${userId}`, // Url
            { user_metadata: { [name]: metadata }},               // Body
        )
    }
}

export default new AuthController();