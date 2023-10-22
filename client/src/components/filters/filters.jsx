import React from "react"
import { useState } from "react";
import { useDispatch, useSelector,  } from "react-redux"
import {getVgByName, updatePage, resetFilter, filterByCreator, filterByGenre, sortByAlphabet, sortByRating } from "../../redux/actions"
import "./filters.css"

const Filter = () => {
//Estados locales para almacenar los valores de los campos de busqueda
const [vgName, setVgName] = useState("");//setVgName fn para actualizar estado
const [genre, setGenre] = useState("");
const [creator, setCreator] = useState("");
const [order, setOrder] = useState("");

const dispatch = useDispatch(); 
const genres = useSelector((state) => state.genres);

// Función se ejecutará cada vez que ocurra  cambio en el campo de búsqueda
const handleSearchInput = (event) => {
    const inputValue = event.target.value;// Obtiene el valor actual del campo de búsqueda.
    setVgName(inputValue);// Actualiza el estado local con el valor del campo de búsqueda.
    dispatch(updatePage(1));//envio acción para actualizar pagina a 1
};

// Función encargada de manejar el evento de enviar el formulario de búsqueda
const handleSearchSubmit = (event) =>{
    event.preventDefault();
    dispatch(getVgByName(vgName));//Envía acción de búsqueda con el nombre del VG
    setVgName(""); //restablecer campo de busqueda 
    setGenre("");
    setCreator("");
    setOrder("");
    dispatch(updatePage(1));
};

//Función se ejecutará cada vez que el usuario seleccione una opción en el campo de genre
const handleFilterByGenre = (event) => {
    const genre = event.target.value;//Obtiene el valor seleccionado del campo de género
    setGenre(genre);//actualizo estado local con valor de genero seleccionado 
    dispatch(filterByGenre(genre));
    setVgName("");
    dispatch(updatePage(1));
}

const handleFilterByCreator = (event) => {
    const creator = event.target.value;
    setCreator(creator);//Actualiza el estado 'creator' con el valor seleccionado
    dispatch(filterByCreator(creator));//Envia acción a store
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
    dispatch(resetFilter());//envio accion a tienda
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