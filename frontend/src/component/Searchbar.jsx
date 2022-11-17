import { useState } from "react";

const Searchbar = ({term, getSearchTerm, inputEl}) => {

    return (
        <div class="">
            <form action="" class="relative mx-auto">
                <input 
                    ref={inputEl}
                    type="text"
                    class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-orange focus:pl-16 focus:pr-4" 
                    value={term}
                    onChange={getSearchTerm}
                    />
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-orange peer-focus:stroke-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </form>
        </div>
    );
}

export default Searchbar;