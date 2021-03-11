import axios from 'axios'

class HttpClient  {
    constructor(){
        axios.interceptors.request.use((config) => {
            config.headers.genericKey = "someGenericValue";
            config.baseURL = 'https://api.needsintransit.com/'
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    post(route, config) {
        return axios.post(route, config);
    }
    get(route, config) {
        return axios.get(route, config);
    }
}
export default HttpClient
