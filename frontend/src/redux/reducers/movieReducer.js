import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    movies:[],
    myMovie:null,
    status: 'idle',
    error: null,
    editMovie:null,
};

//to send a movie to server-side for add in db
export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async(movieData, { rejectWithValue }) => {
        try {
            const res = await axios.post('https://movie-list-app-alpha.vercel.app/api/movies', movieData);
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
            const res = await axios.get("https://movie-list-app-frontend-4z52zky7j-harshh-singhs-projects.vercel.app/api/movies");
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
        try {
            const res = await axios.delete(`https://movie-list-6q10ght6n-harshh-singhs-projects.vercel.app/api/movies/${movie}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.res.data);
        }
    }
);

//to get deatils of a movie we selected
export const getDetails = createAsyncThunk(
    'movies/getDetails',
    async(movie,{rejectWithValue})=>{
        try {
            const res = await axios.get(`https://movie-list-app-alpha.vercel.app/api/movies/${movie}`);
            localStorage.setItem('myMovie', JSON.stringify(res));
            return res.data;
        }catch(error){
            return rejectWithValue(error.res.data);
        }
    }
)

//to change watched status of a movie
export const watchedstatus = createAsyncThunk(
    'movies/watchedStatus',
    async(movie, {rejectWithValue})=>{
        try {
            const res = await axios.put(`https://movie-list-app-alpha.vercel.app/api/movies/${movie}/watchedStatus`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

//get details of movie for form filled
export const editDetails = createAsyncThunk(
    'movies/editDetails',
    async (movieId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`https://movie-list-app-alpha.vercel.app/api/movies/${movieId}/editDetails`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeDetails = createAsyncThunk(
    'movies/changeDetails',
    async (movieId, movieData, {rejectWithValue}) => {
        try {
            const res = await axios.put(`https://movie-list-app-alpha.vercel.app/api/movies/${movieId}/changeDetails`, movieData );
            console.log(res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const MovieSlice = createSlice({
    name: "movie",
    initialState:initialState,
    reducers:{
        addnewMovie:(state) => {
            state.editMovie = '';
        }
    },
    extraReducers: (builder) => {
        builder
        // cases for addMovie
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
          // cases for fetchMovies
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
            // cases for deleteMovie
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
        })
            // cases for getDetails
        .addCase(getDetails.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getDetails.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.myMovie = action.payload;
        })
        .addCase(getDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        //add cases for editDetails
        .addCase(editDetails.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(editDetails.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.editMovie = action.payload;
        })
        .addCase(editDetails.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload;
        })
    },
});

export const movieReducer = MovieSlice.reducer;
export const movieAction = MovieSlice.actions;
export const movieSelector = (state) => state.movieReducer;
