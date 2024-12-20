import { useState, useEffect } from "react";

export default function usePagination(fetchData) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const fetchDataAsync = async () => {
        setLoading(true);
        const response = await fetchData(currentPage, itemsPerPage);
        setData(response.data.users ?? response.data.artists ?? response.data.musics ?? [])
        setTotalPages(response.data.totalPages);
        setLoading(false);
        };

        fetchDataAsync();
    }, [data.length, currentPage, itemsPerPage, fetchData]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        }
    };


    return {
        data,
        loading,
        currentPage,
        totalPages,
        itemsPerPage,
        setItemsPerPage,
        paginate,
        nextPage,
        prevPage,
    };
}