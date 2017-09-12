import axios from 'axios';

export const authAxios = axios.create({
    baseURL: 'https://almshouse.auth0.com'
});

export const initialAxiosConfig = () => {
    axios.defaults.baseURL = 'http://localhost:3001';
}

export const configureAxiosDefaults = (options) => {
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${ options.accessToken }`;
    console.log(authAxios.defaults);
}