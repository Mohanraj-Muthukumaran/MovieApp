export const initialState = {
  movies: [],
  initialMovies: [],
};

const sortAscending = (movieData) => {
  return movieData.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
};

const filter = ({ initialMovies, searchTerm, isAscending }) => {
  let sort;
  let filterData = initialMovies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  sort = sortAscending(filterData);
  if (!isAscending) {
    sort = sortAscending(filterData).reverse();
  }
  return sort;
};

function MovieReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "FETCH":
      return {
        ...state,
        initialMovies: filter({
          initialMovies: payload.data,
          searchTerm: "",
          isAscending: true,
        }),
        movies: filter({
          initialMovies: payload.data,
          searchTerm: "",
          isAscending: true,
        }),
      };
    case "FILTER":
      return {
        ...state,
        movies: filter(payload),
      };
    case "ADD_MOVIE":
      console.log(payload);
      return {
        ...state,
        initialMovies: filter({
          initialMovies: payload,
          searchTerm: "",
          isAscending: true,
        }),
      };
    default:
      throw new Error();
  }
}

export default MovieReducer;
