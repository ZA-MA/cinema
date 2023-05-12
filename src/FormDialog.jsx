import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const defaultMovie = {
	title: '',
	duration: 0,
	genre: '',
	is_foreign: false,
	release_date: '',
};

export default function FormDialog({ open, onClose, onSave, editableMovie }) {
	const [movie, setMovie] = useState(editableMovie || defaultMovie);

	useEffect(() => {
		setMovie(editableMovie || defaultMovie)
	}, [open, editableMovie]);
	
	const onTitleChange = (e) => {
		setMovie({
			...movie,
			title: e.target.value,
		});
	};	
	
	const onDurationChange = (e) => {
		setMovie({
			...movie,
			duration: e.target.value,
		});
	};	
	
	const onGenreChange = (e) => {
		setMovie({
			...movie,
			genre: e.target.value,
		});
	};	
	
	const onIsForeignChange = (e) => {
		setMovie({
			...movie,
			is_foreign: e.target.checked,
		});
		console.log(movie.is_foreign)
	};

	const onReleaseDateChange = (e) => {

		setMovie({
			...movie,
			release_date: dayjs(e).format('YYYY-MM-DD'),
		});
	};
	
	const handleSave = () => {
		onSave(movie);
	};

	return (
	  <Dialog open={open} onClose={onClose}>
		<DialogTitle>Фильм</DialogTitle>
		<DialogContent>
		  <DialogContentText>
			Укажите данные о кошке
		  </DialogContentText>
		  <TextField
			autoFocus
			margin="dense"
			id="title"
			label="Название"
			type="text"
			fullWidth
			variant="standard"
			value={movie.title}
			onChange={onTitleChange}
		  />
		  
		  <TextField
			margin="dense"
			id="duration"
			label="Продолжительность"
			type="number"
			fullWidth
			variant="standard"
			value={movie.duration}
			onChange={onDurationChange}
		  />

		  <FormControl variant="standard" fullWidth>
			<InputLabel id="demo-simple-select-standard-label">Жанр</InputLabel>
			<Select
			  labelId="demo-simple-select-standard-label"
			  id="demo-simple-select-standard"
			  label="Зарубежный"
			  value={movie.genre}
			  onChange={onGenreChange}
			>
			  <MenuItem value={'Комедия'}>Комедия</MenuItem>
			  <MenuItem value={'Фантастика'}>Фантастика</MenuItem>
			  <MenuItem value={'Ужасы'}>Ужасы</MenuItem>
			</Select>
		  </FormControl>
		  
		  <FormControlLabel control={<Checkbox checked={movie.is_foreign} onChange={onIsForeignChange} />} label="Зарубежный" />



			<LocalizationProvider dateAdapter={	AdapterDayjs}>
				<DemoContainer components={['DatePicker']}>
					<DatePicker
						label="Дата выхода"
						value={dayjs(movie.release_date)}
						onChange={onReleaseDateChange}
					/>
				</DemoContainer>
			</LocalizationProvider>




		</DialogContent>
		<DialogActions>
		  <Button onClick={onClose}>Отмена</Button>
		  <Button onClick={handleSave}>Сохранить</Button>
		</DialogActions>
	  </Dialog>
  );
}