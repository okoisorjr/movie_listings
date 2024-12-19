import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
        <React.Fragment>
            <div className="flex justify-center items-center gap-2 my-5">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-4 py-2 cursor-pointer"
                >
                    Prev
                </button>
                {pages.map((page) => (
                    <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-md ${
                        page === currentPage ? 'bg-primary text-white' : 'bg-inputColor text-white'
                    }`}
                    >
                    {page}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-4 py-2 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </React.Fragment>
    )
}

export default Pagination
