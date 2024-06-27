import styles from './moviecard.module.css';
import { deleteMovie } from "../../redux/reducers/movieReducer";
import { useDispatch } from 'react-redux';
import { getDetails } from '../../redux/reducers/movieReducer';
import { useNavigate } from 'react-router-dom';
import { editDetails } from '../../redux/reducers/movieReducer';

function Moviecard({myMovie}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async(movieId) => {
        try {
            await dispatch(deleteMovie(movieId));
        } catch (error) {
            console.error('Failed to delete movie:', error);
        }
    }

    const handleDetails = async(movieId) => {
        try{
            await dispatch(getDetails(movieId));
        } catch(error){
            console.error('Failed to get movie:', error);
        }
        navigate(`/movieDetails/${movieId}`);
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

        <div className={styles.card}>
            <div className={styles.titleSection}>
                <div className={styles.title}>{myMovie.title}</div>
                <div className={styles.release}>{"("}{myMovie.releaseYear}{")"}</div>
            </div>
            <div className={styles.editsection}>
                <div className={styles.genre}>{myMovie.genre}</div>
                <div className={styles.edit}
                onClick={()=>handleEditDetails(myMovie._id)}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2356/2356780.png" alt="edit" />
                    <span>Edit</span>
                </div>
                <div className={styles.delete}
                    onClick={()=>handleDelete(myMovie._id)}>
                    <img src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" alt="delete" />
                    <span>Delete</span>
                </div>
                <div className={styles.details}
                    onClick={()=>handleDetails(myMovie._id)}>
                    <img src="https://cdn-icons-png.flaticon.com/128/10228/10228681.png" alt="details" />
                    <span>Movie Details</span>
                </div>
            </div>
            <div className={styles.ratingsection}>
                <div className={styles.rating}>
                    <img src="https://cdn-icons-png.flaticon.com/128/16596/16596611.png" alt="minus" />
                    <span>{myMovie.rating}</span>
                    <img src="https://cdn-icons-png.flaticon.com/128/929/929495.png" alt="star" />
                    <img src="https://cdn-icons-png.flaticon.com/128/16596/16596444.png" alt="plus" />
                </div>
                <div className={styles.watchstatus}>
                   <span>{myMovie.watched? "Watched":"Not Watched"}</span>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Moviecard;