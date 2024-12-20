import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import LogoImage from "../../assets/Frame.png";

export default function NavBar() {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // add necessary condition
        setSearchValue("");
    };
    return (
        <div className="flex shadow-md bg-violet-600">
            <Link to="/" viewTransition>
            <img src={LogoImage} alt="logo" className="logo-spin w-20 m-5" />
            </Link>
            <div className="w-full flex justify-center items-center">
            <form
                className="dark-gray border border-black rounded-md flex justify-center md:w-[20rem] gap-3 h-10 pl-3"
                onSubmit={handleSubmit}
            >
                <button type="submit" className="text-yellow-300">
                <BsSearch />
                </button>
                <input
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={handleChange}
                required
                className="border-none rounded-r-md bg-violet-800 px-2 text-white placeholder-white w-full"
                />
            </form>
    </div>      
        </div>
    );
}