import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3001/"               // development
    //  baseURL: "http://localhost:5000/api/sonicwall/"                                 // production
})

export default instance;