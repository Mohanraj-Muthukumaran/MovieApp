import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import { MovieContext } from "../../Reducer/MovieContext";

const Navbar = () => {
  const [isAscending, setAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { dispatch, initialMovies, pageSize } = useContext(MovieContext);

  const handlePageSizeChange = (event) => {
    dispatch({
      type: "PAGE_SIZE_CHANGE",
      payload: Number(event.target.value),
    });
  };

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
    </>
  );
};

export default Navbar;
