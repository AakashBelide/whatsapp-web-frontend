import axios from 'axios';

const instance = axios.create({
    //baseURL: "http://localhost:9000",
    baseURL: "https://whatsapp-web-backend.herokuapp.com"
});

export default instance;