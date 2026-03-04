import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

//request inceptor
api.interceptors.request.use((config) => {

    if (config.method?.toLowerCase() === "delete") {
        config.headers['x-task-delete-key'] = "cefcc0c5-52be-4853-87ea-de0c8cf6c4be"
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
});

export default api;