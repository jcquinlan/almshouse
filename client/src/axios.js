import axios from 'axios';

export const authAxios = axios.create({
    baseURL: 'https://almshouse.auth0.com'
});

export const initialAxiosConfig = () => {
    axios.defaults.baseURL = 'http://localhost:3333';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export const configureAxiosDefaults = (options) => {
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${ options.accessToken }`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${ options.idToken }`;
}