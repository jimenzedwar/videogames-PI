import { GET_ALLVG, GET_GENRES, GET_NAME, RENDERED_ITEMS, RESET_FILTERS, FILTER_BY_CREATOR, FILTER_BY_GENRE, UPDATE_PAGE, SORT_BY_ALPHABET, SORT_BY_RATING, CREATE_NEW_VG } from "./actions";

const initialState = {
    videoGames: [],
    genres: [],
    currentVg: [],
    pagination: [],
    currentPage: 1,
    itemsPerPage: 15,
    filteredByCreator: [],
    filteredByGenre: []

}

const rootReducer = (state = initialState, action) => {
switch (action.type) {
    case GET_ALLVG:
        const games = action.payload
        return {
            ...state,
            videoGames: [...games],
            currentVg: [...games],
            filteredByCreator: [...games],
            filteredByGenre: [...games],
        }
    case GET_GENRES:
        const genres = action.payload
        return {
            ...state,
            genres: [...genres]
        }

    case GET_NAME:
        const specVg = action.payload
        return {
            ...state,
            currentVg: specVg,
            pagination: specVg
        }
    case UPDATE_PAGE:
        const currentPage = action.payload
        return {
            ...state,
            currentPage
        }
    case RENDERED_ITEMS: 
    const renderedItems = action.payload
    return {
        ...state,
        pagination: renderedItems
    }
    case FILTER_BY_CREATOR: {
        const creator = action.payload;
        let filteredByCreator; //variable para almacenar los vg filtrados

        if (creator === 'all') {
            filteredByCreator = [...state.videoGames];
        } else if (creator === 'db') {
            filteredByCreator = [...state.videoGames].filter(vg => {
                return isNaN(vg.id)
            })
        } else if (creator === 'api') {
            filteredByCreator = [...state.videoGames].filter(vg => {
                return !isNaN(vg.id)
            })
        };

        let currentVg = [...filteredByCreator].filter(vg => {
            return state.filteredByGenre.includes(vg)
        });

        if (!currentVg.length) {
            currentVg = "No videogames were found with the provided filters."
        };

        return {
            ...state,
            filteredByCreator: filteredByCreator,
            currentVg: currentVg,
            pagination: currentVg
        };
    };

    case FILTER_BY_GENRE: {
        const genre = action.payload;

        let filteredByGenre;

        if (genre === 'allGenres') {
            filteredByGenre = [...state.videoGames];
        } else {
            filteredByGenre = [...state.videoGames].filter(vg => {
                return vg.genres.includes(genre);
            })
        }; 

        let currentVg = [...filteredByGenre].filter(vg => {
            return state.filteredByCreator.includes(vg)
        });

        if (!currentVg.length) {
            currentVg = "No videogames were found with the provided filters."
        };

        return {
            ...state,
            filteredByGenre: filteredByGenre,
            currentVg: currentVg,
            pagination: currentVg        
        };
    }

    case SORT_BY_ALPHABET: {
        const order = action.payload;      
        const compareFunction = ((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        const sortedAz = [...state.currentVg].sort(compareFunction);
        const sortedVg = order === 'a_z' ? sortedAz : [...sortedAz].reverse();

        return {
            ...state,
            currentVg: sortedVg,
            pagination: sortedVg
        };
    };


    case SORT_BY_RATING: {
        const order = action.payload;    
        const compareFunction = ((a, b) => {
            return a.rating - b.rating;
        });

        const sortedDesc = [...state.currentVg].sort(compareFunction);
        const sortedVg = order === 'ratingAsc' ? [...sortedDesc].reverse() : sortedDesc;

        return {
            ...state,
            currentVg: sortedVg,
            pagination: sortedVg
        };
    };
    case RESET_FILTERS:
    return {
        ...state,
        currentVg: state.videoGames,
        pagination: state.videoGames
    }
    case CREATE_NEW_VG:
        const newVg = action.payload
        const newVideoGames = [newVg, ...state.videoGames];
    return {
        ...state,
        pagination: newVideoGames
        
    }

    default:
        return {
            ...state
        };
}
}

export default rootReducer;