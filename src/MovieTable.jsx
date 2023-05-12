import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default ({ movies, onDeleteClick, onEditClick }) => {

	return (
		<TableContainer component={Paper}>
		  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
			<TableHead>
			  <TableRow>
				<TableCell>Название</TableCell>
				<TableCell>Продолжительность</TableCell>
				<TableCell>Жанр</TableCell>
				<TableCell>Зарубежный</TableCell>
				<TableCell>Дата выхода</TableCell>
				<TableCell>Действия</TableCell>
			  </TableRow>
			</TableHead>
			<TableBody>
			  {movies.map((movie) => (
				<TableRow
				  key={movie.id}
				  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				  <TableCell>{movie.title}</TableCell>
				  <TableCell>{movie.duration}</TableCell>
				  <TableCell>{movie.genre}</TableCell>
				  <TableCell>{movie.is_foreign ? 'Да' : 'Нет'}</TableCell>
				  <TableCell>{movie.release_date}</TableCell>
				  <TableCell>
					<IconButton aria-label="edit" onClick={() => onEditClick(movie)}>
					  <EditIcon />
					</IconButton>
					<IconButton aria-label="delete" onClick={() => onDeleteClick(movie)}>
					  <DeleteIcon />
					</IconButton>
				  </TableCell>
				</TableRow>
			  ))}
			</TableBody>
		  </Table>
		</TableContainer>
	);
};
