/* eslint-disable react/prop-types */
import { MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight } from "react-icons/md";


const Pagination = ({totalPosts, paginate, currentPage, nextPage, prevPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPosts; i++) {
        pageNumbers.push(i);
    }

return (
    <nav className="flex justify-center h-[20vh]">
    <ul className='flex items-center'>
        <li className=" mx-1">
        <button onClick={prevPage} className='page-link p-2 border border-slate-500 rounded cursor-pointer' disabled={currentPage === 1}>
            <MdOutlineKeyboardArrowLeft size={20}/>
        </button>
        </li>
        {pageNumbers.map(number => (
        <li key={number} className={`page-item mx-1 ${number === currentPage ? 'text-white' : 'text-yellow'}`}>
            <button onClick={() => paginate(number)} className='page-link px-2 py-1 border border-slate-500 bg-slate-400 rounded cursor-pointer'>
            {number}
            </button>
        </li>
        ))}
        <li className="page-item mx-1">
        <button onClick={nextPage} className='page-link p-2 border border-slate-500 rounded cursor-pointer' disabled={currentPage === pageNumbers.length}>
            <MdOutlineKeyboardArrowRight size={20}/>
        </button>
        </li>
    </ul>
    </nav>
);
};

export default Pagination;