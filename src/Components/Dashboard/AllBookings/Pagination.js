import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination = ({ page, setPage, totalPages }) => {
    const pages = [];
    for (let i = 2; i < totalPages; i++) {
        pages.push(i);
    };

    const startIndex = (p) => {
        if (p <= 3) {
            return 0;
        }
        else if (p > 3 && p < 498) {
            return p - 3
        }
        else if (p >= 498) {
            return 495
        }
    };

    const endIndex = (p) => {
        if (p <= 3) {
            return 3;
        }
        else if (p > 3 && p < 498) {
            return p
        }
        else if (p >= 498) {
            return totalPages
        }
    }



    return (
        <div className="btn-group">
            <button onClick={() => setPage(1)} className="btn btn-sm px-2">
                <FaAngleDoubleLeft />
            </button>

            <button
                onClick={() => setPage(1)}
                className={`btn btn-sm ${1 === page && 'bg-highlight text-black hover:bg-highlight hover:text-black'}`}>
                1
            </button>

            {
                page > 3 &&
                <button className="btn btn-sm btn-disabled bg-slate-900 text-white">...</button>
            }

            {
                pages.slice(startIndex(page), endIndex(page))?.map((p, i) =>
                    <button
                        key={i}
                        onClick={() => setPage(p)}
                        className={`btn btn-sm ${p === page && 'bg-highlight text-black hover:bg-highlight hover:text-black'}`}>
                        {p}
                    </button>)
            }

            {
                page < totalPages - 3 &&
                <button className="btn btn-sm btn-disabled bg-slate-900 text-white">...</button>
            }

            {
                totalPages > 1 &&
                <button
                    onClick={() => setPage(totalPages)}
                    className={`btn btn-sm ${totalPages === page && 'bg-highlight text-black hover:bg-highlight hover:text-black'}`}>
                    {totalPages}
                </button>
            }

            <button onClick={() => setPage(totalPages)} className="btn btn-sm px-2">
                <FaAngleDoubleRight />
            </button>
        </div>
    );
};

export default Pagination;