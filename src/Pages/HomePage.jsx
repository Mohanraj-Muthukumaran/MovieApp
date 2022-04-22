import React, { useContext } from "react";
import { useState, useEffect, useMemo } from "react";
import MovieCard from "../Components/MovieCard";
import "./styles.css";
import AddForm from "./AddForm";
import { MovieContext } from "../Reducer/MovieContext";
import Pagination from "../Components/Pagination/Pagination";

const HomePage = () => {
  const [isAscending, setAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };
  const { dispatch, movies, initialMovies } = useContext(MovieContext);

  let movieData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return movies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, movies, pageSize]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch("https://api.tvmaze.com/shows");
        let data = await response.json();
        dispatch({
          type: "FETCH",
          payload: { data },
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchMyAPI();
  }, [dispatch]);

  useEffect(() => {
    function filter() {
      dispatch({
        type: "FILTER",
        payload: { initialMovies, searchTerm, isAscending },
      });
    }

    filter();
  }, [searchTerm, isAscending, initialMovies, dispatch]);

  return (
    <>
      <div className='nav-bar'>
        <header className='App-header'>
          <h2>Movie Cards</h2>
        </header>
        <div className='search-box'>
          <input
            className='input-search'
            id='search'
            placeholder='Type to Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='button-group'>
          <button
            className='button'
            onClick={() => {
              setAscending(true);
            }}
          >
            A - Z
          </button>
          <button
            className='button'
            onClick={() => {
              setAscending(false);
            }}
          >
            Z - A
          </button>
          <select
            className='button'
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
          </select>
        </div>
      </div>
      <div>
        <div>
          <AddForm />
        </div>

        <div className='pagination'>
          <Pagination
            currentPage={currentPage}
            totalMovieCount={movies.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        {movieData.length ? (
          <div className='movie-list'>
            {movieData.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <div className='no-result'>
            <p>No Results Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
