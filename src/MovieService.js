import http from './http';

const getMovies = () => {
	return http.get('/movies');
};

const createMovie = (data) => {
	return http.post('/movies', data).then(r => r.data.id);
};

const editMovie = (id, data) => {
	return http.put(`/movies/${id}`, data);
};

const deleteMovie = (id) => {
	return http.delete(`/movies/${id}`);
};

export default {
	getMovies,
	createMovie,
	editMovie,
	deleteMovie,
};
