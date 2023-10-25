import React from "react"
import { useState } from "react";
import { useDispatch, useSelector,  } from "react-redux"
import {getVgByName, updatePage, resetFilter, filterByCreator, filterByGenre, sortByAlphabet, sortByRating } from "../../redux/actions"
import "./filters.css"

const Filter = () => {
const [vgName, setVgName] = useState("");
const [genre, setGenre] = useState("");
const [creator, setCreator] = useState("");
const [order, setOrder] = useState("");

const dispatch = useDispatch(); 
const genres = useSelector((state) => state.genres);

const handleSearchInput = (event) => {
    const inputValue = event.target.value;
    setVgName(inputValue);
    dispatch(updatePage(1));
};


const handleSearchSubmit = (event) =>{
    event.preventDefault();
    dispatch(getVgByName(vgName));
    setVgName("");
    setGenre("");
    setCreator("");
    setOrder("");
    dispatch(updatePage(1));
};


const handleFilterByGenre = (event) => {
    const genre = event.target.value;
    setGenre(genre);
    dispatch(filterByGenre(genre));
    setVgName("");
    dispatch(updatePage(1));
}

const handleFilterByCreator = (event) => {
    const creator = event.target.value;
    setCreator(creator);
    dispatch(filterByCreator(creator));
    setVgName("");
    setOrder("");
    dispatch(updatePage(1));
}

const handleSort = (event) => {
    const order = event.target.value;
    setOrder(order);
    if (order === "a_z" || order === "z_a") {
        dispatch(sortByAlphabet(order));
    } else if (order === "ratingAsc" || order === "ratingDesc") {
        dispatch(sortByRating(order));
}
    dispatch(updatePage(1));
};

const handleResetFilters = (event) => {
    event.preventDefault();
    dispatch(resetFilter());
    setVgName("");
    setCreator("");
    setGenre("");
    setOrder("");
    dispatch(updatePage(1));
    };

    return (
        <div className="filters">

        
<form className="searchBar" onSubmit={handleSearchSubmit}>
            <div className="InputContainer">
            <input className="searchInput"
                type="text"
                placeholder="Search by name..."
                value={vgName}
                onChange={handleSearchInput}
            />
            </div>
            <button className="searchSubmitbtn"
                type="submit"><span>
                <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
              </span></button>
            </form>

            <div className="selectG">
        <select className="genreSelector"
            name="filterByGenre"
            value={genre}
            onChange={handleFilterByGenre}
        >
        <option disabled value="">Genre</option>
        <option value="allGenres">All Genres</option>
        {genres.map((genre, index) =>{
            return(
                <option key={index} value={genre}>{genre}</option>
            );
        })}
    </select>
    </div>
    <div className="selectC">
    <select className="creatorSelector"
        name="filterByCreator"
        value={creator}
        onChange={handleFilterByCreator}
    >
        <option disabled value="">Creator</option>
        <option value="all">All</option>
        <option value="db">Database</option>
        <option value="api">API</option>
    </select>
    </div>
    <div className="selectS">
    <select className="sortSelector"
        name="Sort"
        value={order}
        onChange={handleSort}
        >
        <option disabled value="">Sort</option>
        <option value="a_z">A-Z</option>
        <option value="z_a">Z-A</option>
        <option value="ratingAsc">Rating ↑</option>
        <option value="ratingDesc">Rating ↓</option>
        </select>
        </div>
    <button className="ResetFilters" onClick={handleResetFilters}> 
    <div className="signR">↻</div>
        <div className="textR">Reset</div>
        </button>
    </div>
    )
}
export default Filter