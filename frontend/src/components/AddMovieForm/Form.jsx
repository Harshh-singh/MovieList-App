import styles from './form.module.css';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addMovie } from '../../redux/reducers/movieReducer';
import { useNavigate } from 'react-router-dom';
import { changeDetails } from '../../redux/reducers/movieReducer';

function MovieForm(){
    const movie = useSelector((state)=>state.movieReducer.editMovie);
    const [title, setTitle] = useState(movie.title || '');
    const [description, setDescription] = useState(movie.description || '');
    const [releaseYear, setReleaseYear] = useState(movie.releaseYear || '');
    const [genre, setGenre] = useState(movie.genre || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const movieData = { title, description, releaseYear, genre };
        dispatch(addMovie(movieData));
        navigate('/');
      };

    const onCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    

    return(
        <div className={styles.container}>
            <span>Add/Edit Movie</span>
            <form className={styles.movieform} onSubmit={handleSubmit}>
                <div className={styles.formgroup}>
                <label htmlFor={styles.title}>Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="releaseYear">Release Year:</label>
                    <input
                    type="number"
                    id="releaseYear"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="genre">Genre:</label>
                    <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className={styles.formactions}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={(event)=>onCancel(event)}>Cancel</button>
                </div>
        </form>
    </div>
    )
}

export default MovieForm;