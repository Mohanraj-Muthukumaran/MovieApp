import React from "react";
import { usePagination, DOTS } from "./usePagination";
import "./Pagination.scss";

const Pagination = ({
  onPageChange,
  totalMovieCount,
  pageSize,
  pageButtonsBetweenCount = 1,
  currentPage,
}) => {
  const paginationRange = usePagination({
    totalMovieCount,
    pageSize,
    pageButtonsBetweenCount,
    currentPage,
  });

  // means less than 2 ie 1 or 0
  if (
    !paginationRange.includes(currentPage) ||
    paginationRange.length < 2
  ) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className='pagination-container'>
      <li
        className={
          currentPage === 1
            ? "pagination-item disabled"
            : "pagination-item"
        }
        onClick={onPrevious}
      >
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
              className={
                currentPage === pageNumber
                  ? "pagination-item disabled"
                  : "pagination-item selected"
              }
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        }
      })}
      <li
        className={
          currentPage === lastPage
            ? "pagination-item disabled"
            : "pagination-item"
        }
        onClick={onNext}
      >
        <div className='arrow right'></div>
      </li>
    </ul>
  );
};

export default Pagination;
