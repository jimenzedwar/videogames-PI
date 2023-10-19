import React from "react"
import { useEffect} from "react"; 
import { useDispatch, useSelector,  } from "react-redux"
import { getAllgenres, getAllvg } from "../../redux/actions";
import Cards from "../cards/cards";
import Pagination from "../pagination/pagination";
import Filter from "../filters/filters";
import { useNavigate } from "react-router-dom";

export default function Home () {
    
    const videoGames = useSelector((state) =>state.videoGames);
    const genres = useSelector((state) =>state.genres);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {//se ejecutará después de que el componente se monte en el DOM.
        if (!videoGames.length) dispatch(getAllvg()); 
        if (!genres.length) dispatch(getAllgenres());//si la longitud es cero se envia accion a traves de dispatch
        },[videoGames, genres])

const createVg = () => {
    navigate("/create")
}

return (
    <div className="Home">
        <button onClick={createVg}>Create a videoGame</button>
            <Filter />
            <Pagination />
            <Cards />
</div>
)
}