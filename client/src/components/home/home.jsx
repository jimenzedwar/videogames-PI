import React from "react"
import { useEffect} from "react"; 
import { useDispatch, useSelector,  } from "react-redux"
import { getAllgenres, getAllvg } from "../../redux/actions";
import Cards from "../cards/cards";
import Pagination from "../pagination/pagination";
import "./home.css"
import NavBar from "../navBar/Navbar";
import Featured from "../featured/featured";
export default function Home () {
    
    const videoGames = useSelector((state) =>state.videoGames);
    const genres = useSelector((state) =>state.genres);
    const dispatch = useDispatch()

    useEffect(() => {//se ejecutará después de que el componente se monte en el DOM.
        if (!videoGames.length) dispatch(getAllvg()); 
        if (!genres.length) dispatch(getAllgenres());//si la longitud es cero se envia accion a traves de dispatch
        },[videoGames, genres])

return (
    <div className="Home">
            <NavBar/>
            <Cards />
            <Pagination />
            <Featured />
</div>
)
}