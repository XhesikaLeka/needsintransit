import axios from 'axios'

class AdminHttpClient extends HttpClient  {
    constructor(){
        axios.interceptors.request.use((config) => {
            config.headers.genericKey = "someGenericValue";
            config.baseURL = 'https://api.needsintransit.com/'
            config.headers.authorization = 'token here'
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

}