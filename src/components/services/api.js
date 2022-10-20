import axios from "axios";

const API_KEY = '30682188-a4df5baa0b20fc2c844c5ce84';
const BASE_URL = 'https://pixabay.com/api/'

export const getData = async (query, page) => {  
    return await axios({
    method: 'get',
    url: BASE_URL,
    params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page: page,
       }
    })
    
}



