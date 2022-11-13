import React from "react";

const Pagination = ({postPerPage, totalPost, paginate}) => {
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(totalPost/postPerPage); i++){
        pageNumber.push(i);
    }

    return (
        <nav className="items-center">
            <ul className="pagination flex items-center justify-center">
                {pageNumber.map(number =>(
                    <li key={number} className="page-item mx-3">
                        <p onClick={()=>paginate(number)} className="page-link">
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;