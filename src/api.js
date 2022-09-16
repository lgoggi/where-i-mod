import axios from "axios";


const api = axios.create({
    headers: {
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        'Authorization': process.env.REACT_APP_AUTHORIZATION,
    }
})

export default api;