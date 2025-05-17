import React, { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onTotalPageItem: (total: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  onTotalPageItem,
}) => {
  const [totalPageItem, setTotalPageItem] = useState(12);

  useEffect(() => {
    onTotalPageItem(totalPageItem);
  }, [totalPageItem]);

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <>
      <div className="join mt-4">
        <button
          className="join-item btn"
          onClick={handlePrev}
          disabled={page === 1}
        >
          «
        </button>
        <button className="join-item btn cursor-default">Page {page}</button>
        <button
          className="join-item btn"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          »
        </button>
        <select
          className="select ml-3"
          onChange={(e) => setTotalPageItem(parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </>
  );
};

export default Pagination;
