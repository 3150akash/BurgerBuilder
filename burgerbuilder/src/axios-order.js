import axios from 'axios';
const instance =axios.create({
    baseURL:"https://react-my-burger-ff5f3.firebaseio.com/"
});
export default instance;