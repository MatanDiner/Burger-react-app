import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-reactapp-2263b.firebaseio.com/'
});


export default instance;