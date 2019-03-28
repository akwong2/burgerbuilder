import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-c3baf.firebaseio.com/"
});

export default instance;
