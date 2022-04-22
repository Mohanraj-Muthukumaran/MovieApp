import React, { useContext } from "react";
import { MovieContext } from "../Reducer/MovieContext";
import { usePagination, DOTS } from "./Pagination/usePagination";
import "./Pagination/Pagination.scss";

const Pagination = ({
  onPageChange,
  totalMovieCount,
  pageSize,
  pageButtonsBetweenCount = 1,
  currentPage,
  className,
}) => {
  const { movies } = useContext(MovieContext);
  console.log(movies);

  const paginationRange = usePagination({
    totalMovieCount,
    pageSize,
    pageButtonsBetweenCount,
    currentPage,
  });

  // means less than 2 ie 1 or 0
  if (paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className='pagination-container'>
      <li className='pagination-item' onClick={onPrevious}>
        <div className='arrow left'></div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className='pagination-item dots'>
              &#8230;
            </li>
          );
        } else {
          return (
            <li
              key={index}
              className='pagination-item'
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        }
      })}
      <li className='pagination-item' onClick={onNext}>
        <div className='arrow right'></div>
      </li>
    </ul>
  );
};

export default Pagination;
