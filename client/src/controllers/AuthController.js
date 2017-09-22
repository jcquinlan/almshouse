import axios from 'axios';

class AuthController {
    updateMetadata(userId, name, metadata) {
        console.log('executing metadata update');
        return axios.patch(
            `https://almshouse.auth0.com/api/v2/users/${userId}`, // Url
            { user_metadata: { [name]: metadata }},               // Body
        )
    }
}

export default new AuthController();