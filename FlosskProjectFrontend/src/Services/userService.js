import HttpClient from '../Common/httpCLient'

export const getUsers = () => {
    const httpClient = new HttpClient();
    return httpClient.get('users', {
        id: 1
    })
}