import axios from 'axios';

const http = axios.create({
	baseURL: 'https://api.ptpit.ru/api/zaytsev'
});

export default http;
