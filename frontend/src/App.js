import MainLayouts from './components/MainLayouts/MainLayouts';
import MovieForm from './components/AddMovieForm/Form';
import MovieDetails from './components/MovieDetailspage/MovieDetails';

import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";

function App(){

  const router = createBrowserRouter([
    {path:'/', element:<MainLayouts/>},
    {path:'/newMovie', element:<MovieForm/>},
    {path:'/movieDetails/:movieId', element:<MovieDetails/>}
  ])


    return(
      <>
    <RouterProvider router={router}></RouterProvider>
    </>
    )
}

export default App;
