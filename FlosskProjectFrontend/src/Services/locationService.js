import HttpClient from '../Common/httpCLient'

export const getlocations = () => {
    const httpClient = new HttpClient();
    return httpClient.get('locations/', {
    })
}
export const getLocationByCategory = (category) => {
    const httpClient = new HttpClient();
    return httpClient.get('locations/category/'+category.replace(/\s/g, ""), {
    })
}