import React, { useState, useEffect } from "react";
import MovieService from './MovieService';
import MovieTable from './MovieTable';
import FormDialog from './FormDialog';
import Button from '@mui/material/Button';
import './App.css'

export default () => {
	const [movies, setMovies] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [editableMovie, setEditableMovie] = useState(null);
	
	useEffect(() => {
		MovieService.getMovies().then((r) => setMovies(r.data));
	}, []);
	
	const openAddDialog = () => {
		setEditableMovie(null);
		setOpenDialog(true);
	};
	
	const openEditDialog = (movie) => {
		setEditableMovie(movie);
		setOpenDialog(true);
	};
	
	const closeDialog = () => {
		setOpenDialog(false);
	};
	
	const createMovie = (movie) => {
		MovieService.createMovie(movie).then(id => {
			setMovies([
				...movies,
				{ ...movie, id },
			]);
		});
	};
	
	const updateMovie = (movie) => {
		const { id, ...data } = movie;
		
		MovieService.editMovie(id, data).then(() => {
			const newMovies = [...movies];
			const newMovie = newMovies.find(m => m.id === id);
			newMovie.title = movie.title;
			newMovie.duration = movie.duration;
			newMovie.genre = movie.genre;
			newMovie.is_foreign = movie.is_foreign;
			newMovie.release_date = movie.release_date;
			setMovies(newMovies);
		});
	};
	
	const deleteMovie = (movie) => {
		MovieService.deleteMovie(movie.id).then(() => {
			setMovies(
				movies.filter(m => m.id !== movie.id)
			);
		});
	};
	
	const onDialogSave = (movie) => {
		if (movie.id) {
			updateMovie(movie);
		} else {
			createMovie(movie);
		}
		
		closeDialog();
	};
	
	return (
		<>
			<div className="container">
				<h1>Список фильмов</h1>

				<Button variant="contained" onClick={openAddDialog}>
					Добавить
				</Button>
				<div className="table">
					<MovieTable movies={movies} onDeleteClick={deleteMovie} onEditClick={openEditDialog} />
				</div>
			</div>
			<FormDialog open={openDialog} onClose={closeDialog} onSave={onDialogSave} editableMovie={editableMovie} />
			

		</>
	)
};
