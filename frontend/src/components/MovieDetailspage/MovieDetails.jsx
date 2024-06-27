import styles from './moviedetails.module.css';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { watchedstatus } from '../../redux/reducers/movieReducer';
import { deleteMovie } from '../../redux/reducers/movieReducer';
import { editDetails } from '../../redux/reducers/movieReducer';

function MovieDetails() {
    const movie = useSelector((state) => state.movieReducer.myMovie);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

      const backHome = () => {
        navigate('/');
        localStorage.removeItem('myMovie');
      }

       const handleToggleWatchStatus = async (movieId) => {
            console.log(movieId);
            try{
                await dispatch(watchedstatus(movieId));
            }catch(error){
                console.error('Error updating watch status:', error);
            }
        };    

        const handleDelete = async(movieId) => {          
            try {
                await dispatch(deleteMovie(movieId));
                navigate('/');
            } catch (error) {
                console.error('Failed to delete movie:', error);
            }
        }

        const handleEditDetails = async(movieId) => {
            try {
                await dispatch(editDetails(movieId));
            } catch (error) {
                console.error('Failed to get movie:', error);
            }
            navigate('/newMovie');
        }

    return(
        <div className={styles.details}>
            <div className={styles.container}>
            <img src="https://cdn-icons-png.flaticon.com/128/3208/3208562.png" alt="home" 
            onClick={backHome}/>
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <p>Release Year: {movie.releaseYear}</p>
                <p>Genre: {movie.genre}</p>
                <p>Watched: {movie.watched ? 'Yes' : 'No'}</p>
                <p>Rating: {movie.rating}</p>
                <div className={styles.buttons}>
                    <button 
                    onClick={()=>handleToggleWatchStatus(movie._id)}>
                        {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                    </button>
                    <button onClick={()=>handleDelete(movie._id)}>Delete</button>
                    <button onClick={() => handleEditDetails(movie._id)}>Edit</button>
                    {/* Add more functionality for rating and reviews */}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;