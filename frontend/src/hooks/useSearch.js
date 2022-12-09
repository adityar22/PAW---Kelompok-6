import { useState, useRef } from "react";

export const useSearch = (data) => {
    const [searchTerm, setSearchTerm] = useState("");
    const inputEl = useRef("");
    const [searchResult, setSearchresult] = useState([]);

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newDataList = data.filter((item) => {
                return Object.values(item)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchresult(newDataList);
        } else {
            setSearchresult(data);
        }
    };

    const getSearchTerm = () => {
        searchHandler(inputEl.current.value);
    };

    return { searchResult, searchHandler, getSearchTerm, inputEl, searchTerm };
}
