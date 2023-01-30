import axios from 'axios';
import { getEnvironment } from '../helpers';

const { VITE_API_URL } = getEnvironment()

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
    // headers: { 
    //     'Content-Type': 'application/json'
    // },
})

calendarApi.interceptors.request.use(config => {

    config.headers = { 
        ...config.headers,
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token')
    };

    return config;
})

export default calendarApi;