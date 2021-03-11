import HttpClient from '../Common/httpCLient'

export const addSuggestion = (request) => {
    const httpClient = new HttpClient();
    return httpClient.post('suggestion/', request)
}