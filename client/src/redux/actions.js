import axios from "axios"

const GET_ALLVG = "GET_ALLVG"
const GET_GENRES = "GET_GENRES"
const GET_NAME = "GET_NAME"
const UPDATE_PAGE = "UPDATE_PAGE"
const RENDERED_ITEMS = "RENDERED_ITEMS"
const SORT_BY_ORIGIN = "SORT_BY_ORIGIN"
const RESET_FILTERS = "RESET_FILTERS"
const FILTER_BY_GENRE = "FILTER_BY_GENRE"
const FILTER_BY_CREATOR = "FILTER_BY_CREATOR"
const SORT_BY_ALPHABET = "SORT_BY_ALPHABET"
const SORT_BY_RATING = "SORT_BY_RATING"
const CREATE_NEW_VG = "CREATE_NEW_VG"

const getAllvg = () => {
    const endpoint = "/videogames"
    return async (dispatch) => {
        try{
            const response = await axios.get(endpoint);
            const videoGames = response.data;//Se extraen la lista de videojuegos y se almacenan en la variable VideoGames.
        dispatch({//Dispara la acción 
            type: GET_ALLVG,//tipo de acción 
            payload: videoGames//lista de videoGames como carga util
    });
        }catch(error){
            alert(error.message);
        }
    }}

const getAllgenres = () => {
    const endpoint = "/genres"
    return async (dispatch) => {
        try{
            const response = await axios.get(endpoint);
            const genres = response.data;//Se extraen la lista de Genres y se almacenan en la variable genres.
        dispatch({
            type: GET_GENRES,
            payload: genres
    });
        }catch(error){
            alert(error.message);
        }
    }}

    const getVgByName = (vgName) => {
        const endpoint = `/videogames/?name=${vgName}`
        return async (dispatch) => {
            try{
                const response = await axios.get(endpoint);
                const specVideoGame = response.data;//Se extrae el videojuego
            dispatch({
                type: GET_NAME,
                payload: specVideoGame
        });
            }catch(error){
                alert(`We couldn't find a game with the name ${vgName}`);
            }
        }}

    const updatePage = (page) => {
        return {
        type: UPDATE_PAGE,
        payload: page
        }}

    const renderedItems = (items) => {
        return {
            type: RENDERED_ITEMS,
            payload: items
        }}

    const sortByAlphabet = (order) => {
            return {
                type: SORT_BY_ALPHABET,
                payload: order
            };
        };
        
    const sortByRating = (order) => {
            return {
                type: SORT_BY_RATING,
                payload: order
            }}

const filterByGenre = (genres) => {
    return {
        type: FILTER_BY_GENRE,
        payload: genres
    };
};

const filterByCreator = (creator) => {
    return {
        type: FILTER_BY_CREATOR,
        payload: creator
    };
};

    const resetFilter = () => {
        return {
            type: RESET_FILTERS,
        }
    }
    const createNewVg = (newVg) => {
        const endpoint = `/videogames`
        return async (dispatch) => {
            try{
                await axios.post(endpoint, newVg);
            dispatch({
                type: CREATE_NEW_VG,
                payload: newVg
        });
            }catch(error){
                alert(error.message);
            }
        }}

export {getAllvg, getAllgenres, getVgByName, updatePage, renderedItems, filterByCreator, filterByGenre, sortByAlphabet, sortByRating, resetFilter, createNewVg, GET_ALLVG, GET_GENRES, GET_NAME, UPDATE_PAGE, RENDERED_ITEMS, SORT_BY_ORIGIN, RESET_FILTERS, FILTER_BY_CREATOR, FILTER_BY_GENRE, SORT_BY_ALPHABET, SORT_BY_RATING, CREATE_NEW_VG }