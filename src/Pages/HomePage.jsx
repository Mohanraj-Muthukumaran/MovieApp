import React, { useContext } from "react";
import { useState, useEffect, useMemo } from "react";
import MovieCard from "../Components/Card/MovieCard";
import "./styles.css";
import { MovieContext } from "../Reducer/MovieContext";
import Pagination from "../Components/Pagination/Pagination";
import Navbar from "../Components/Navbar/Navbar";
import FormButton from "../Components/Form/FormButton";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { dispatch, movies, pageSize } = useContext(MovieContext);

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

  return (
    <>
      <Navbar />
      <div>
        <div>
          <FormButton />
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

        <div className='pagination'>
          <Pagination
            currentPage={currentPage}
            totalMovieCount={movies.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
