import React from "react";

import styles from "../../styles/Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "./types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 25, 50, 100],
  maxVisiblePages = 5,
  className = "",
  ...props
}) => {
  // Calculate visible page range
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Calculate items range
  const getItemsRange = (): { start: number; end: number } => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return { start, end };
  };

  const visiblePages = getVisiblePages();
  const { start, end } = getItemsRange();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    onPageSizeChange?.(newPageSize);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`${styles.paginationContainer} ${className}`} {...props}>
      {/* Items info */}
      <div className={styles.itemsInfo}>
        <span className={styles.itemsText}>
          Showing <span className={styles.itemsCount}>{start}</span> to{" "}
          <span className={styles.itemsCount}>{end}</span> of{" "}
          <span className={styles.itemsCount}>{totalItems}</span>
        </span>
      </div>

      {/* Pagination controls */}
      <div className={styles.paginationControls}>
        {/* Previous button */}
        <button
          className={`${styles.paginationButton} ${styles.navButton}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* First page */}
        {visiblePages[0] > 1 && (
          <>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className={styles.ellipsis}>...</span>
            )}
          </>
        )}

        {/* Visible pages */}
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`${styles.paginationButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className={styles.ellipsis}>...</span>
            )}
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          className={`${styles.paginationButton} ${styles.navButton}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Page size selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className={styles.pageSizeSelector}>
          <label htmlFor="pageSize" className={styles.pageSizeLabel}>
            out of {totalPages}
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className={styles.pageSizeSelect}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
