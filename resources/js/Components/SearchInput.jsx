import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Search({ URL }) {
    const [search, setSearch] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        router.get(`${URL}?q=${search}`);
    };

    return (
        <>
            <form onSubmit={searchHandler}>
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaMagnifyingGlass />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500  "
                        placeholder="Type keywords"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 btn-primary font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Search
                    </button>
                </div>
            </form>
        </>
    );
}
