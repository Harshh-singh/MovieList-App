import styles from './moviecard.module.css';
import { deleteMovie } from "../../redux/reducers/movieReducer";
import { useDispatch } from 'react-redux';

function Moviecard({myMovie}) {

    const dispatch = useDispatch();

    const handleDelete = async(movieId) => {
        try {
            await dispatch(deleteMovie(movieId));
        } catch (error) {
            console.error('Failed to delete movie:', error);
        }
    }

    return(

        <div className={styles.card}>
            <div className={styles.titleSection}>
                <div className={styles.title}>{myMovie.title}</div>
                <div className={styles.release}>{"("}{myMovie.releaseYear}{")"}</div>
            </div>
            <div className={styles.editsection}>
                <div className={styles.genre}>{myMovie.genre}</div>
                <div className={styles.edit}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2356/2356780.png" alt="edit" />
                    <span>Edit</span>
                </div>
                <div className={styles.delete}
                    onClick={()=>handleDelete(myMovie._id)}
                >
                    <img src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" alt="delete" />
                    <span>Delete</span>
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
                    <span>Watched?</span>
                    <input type="checkbox" name="watched" id="watchedmovie" checked={myMovie.watched}/>
                </div>
            </div>
            
        </div>
    )
}

export default Moviecard;