import NavBar from "../Navbar/Navbar";
import MovieList from "../MovieList/MovieList";
import styles from './mainlayouts.module.css';

function MainLayouts(){
    return(
        <div className={styles.container}>
            <NavBar className={styles.navbar}/>
            <MovieList className={styles.movielist}/>
        </div>
    )
}

export default MainLayouts;