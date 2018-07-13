import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://reactjs-udemy-burgerbuilder.firebaseio.com/'
})

export default instance;