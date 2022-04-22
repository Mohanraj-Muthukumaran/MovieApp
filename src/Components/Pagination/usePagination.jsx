import { useMemo } from "react";

const DOTS = "...";

const usePagination = ({
  totalMovieCount,
  pageSize,
  pageButtonsBetweenCount,
  currentPage,
}) => {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  };

  return useMemo(() => {
    const totalPageCount = Math.ceil(totalMovieCount / pageSize);
    // pageButtonBetweenCount + firstPage + leftDot + currentPage + rightDot + lastPage
    const totalPageButtonsToBeShown =
      pageButtonsBetweenCount + 1 + 1 + 1 + 1 + 1;

    if (totalPageButtonsToBeShown >= totalPageCount) {
      return range(1, totalPageCount);
    } else {
      const leftPageBetweenButtonIndex = Math.max(
        currentPage - pageButtonsBetweenCount,
        1
      );
      const rightPageBetweenButtonIndex = Math.min(
        currentPage + pageButtonsBetweenCount,
        totalPageCount
      );

      // means from the 3rd page
      const shouldShowLeftDots = leftPageBetweenButtonIndex > 2;
      const shouldShowRightDots =
        rightPageBetweenButtonIndex < totalPageCount - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftPageButtonsCount = 3 + 2 * pageButtonsBetweenCount;
        let leftRange = range(firstPageIndex, leftPageButtonsCount);

        return [...leftRange, DOTS, lastPageIndex];
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightPageButtonsCount = 3 + 2 * pageButtonsBetweenCount;
        let rightRange = range(
          lastPageIndex - rightPageButtonsCount + 1,
          lastPageIndex
        );

        return [firstPageIndex, DOTS, ...rightRange];
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(
          leftPageBetweenButtonIndex,
          rightPageBetweenButtonIndex
        );

        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      } else {
        return ["ERROR"];
      }
    }
  }, [totalMovieCount, pageSize, pageButtonsBetweenCount, currentPage]);
};

export { usePagination, DOTS };
