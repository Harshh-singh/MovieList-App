import Moviecard from "../MovieCard/MovieCard";
import styles from "./movieList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../../redux/reducers/movieReducer";


function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector((state)=>state.movieReducer.movies);
    console.log(movies);

    useEffect(()=>{
        dispatch(fetchMovies())
    }, [dispatch]);


    return(
        <div className={styles.MovieList}>
            <span>YOUR RECENT MOVIES</span>

            <div className={styles.movies}>
                {movies.map((movie,index)=>(
                    <Moviecard myMovie={movie} key={index}/>
                ))}
                
            </div>
            
        </div>
    )
}

export default MovieList;