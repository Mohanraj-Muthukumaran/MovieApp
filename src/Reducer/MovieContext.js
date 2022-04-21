import { createContext, useReducer } from "react";
import movieReducer, { initialState } from "./MovieReducer";

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const addMovie = (newMovie) => {
    let updateMovies = [...state.initialMovies, newMovie];
    dispatch({
      type: "ADD_MOVIE",
      payload: updateMovies,
    });
  };

  const value = {
    movies: state.movies,
    initialMovies: state.initialMovies,
    dispatch,
    addMovie,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
