import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useEffect} from 'react';

const initialState = {
    movies:[
        {
            title:"The Amazing SpiderMan",
            description:"Peter Parker a ordinary boy becomes a superhero after a spider bite him",
            releaseYear:"2018",
            genre:"Fantasy",
            rating:0,
            watched:true
        },
    ],
    status: 'idle',
    error: null
};

//to send a movie to server-side
export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async(movieData, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/movies', movieData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.res.data);
        }
    }
);

//to get all movies from server-side
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async(_, {rejectWithValue}) => {
        try {
            const res = await axios.get("http://localhost:5000/api/movies");
            console.log(res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.res.data);   
        }
    }
)

//send delete movie request to backend with _id of that movie
export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async(movie, {rejectWithValue}) => {
        console.log(movie);
        try {
            const res = await axios.delete(`http://localhost:5000/api/movies/${movie}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.res.data);
        }
    }
);


const MovieSlice = createSlice({
    name: "movie",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addMovie.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addMovie.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.movies.push(action.payload);
        })
        .addCase(addMovie.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })

        .addCase(fetchMovies.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })

        .addCase(deleteMovie.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteMovie.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Update state to remove the deleted movie
            state.movies = state.movies.filter(movie => movie._id !== action.payload.deletedMovie._id);
        })
        .addCase(deleteMovie.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const movieReducer = MovieSlice.reducer;
export const movieAction = MovieSlice.actions;
export const movieSelector = (state) => state.movieReducer;