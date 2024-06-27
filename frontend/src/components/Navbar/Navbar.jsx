import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { useDispatch } from 'react-redux';
import { movieAction } from '../../redux/reducers/movieReducer';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddMovie = () => {
        navigate('/newMovie')
        dispatch(movieAction.addnewMovie());
    }

    return(
        <div className={styles.NavBar}>
            <span>
                Movielist
            </span>

            <div className={styles.buttons}>
                <button type="submit"
                onClick={()=>handleAddMovie()}
                >
                    <img src="https://cdn-icons-png.flaticon.com/128/16596/16596388.png" alt="add" />
                    Add new Movie
                </button>
            </div>

            <hr />

            <div className={styles.myList}>
                <span>
                    My List
                </span>
                <div className={styles.list}>
                    <span>Action</span>
                    <span>Horror</span>
                    <span>Sci-fi</span>
                    <span>Marvels</span>
                    <span>Blockbuster</span>
                    <span>Hollywood</span>
                </div>
            </div>
            
            <Outlet/>
        </div>
        
    )
}

export default NavBar;