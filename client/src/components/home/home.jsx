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
    const vgsToRendered = useSelector((state) => state.pagination);
    const dispatch = useDispatch()

    useEffect(() => { 
        if (!videoGames.length) dispatch(getAllvg()); 
        if (!genres.length) dispatch(getAllgenres()); 
        },[videoGames, genres])

return (
    typeof vgsToRendered === "string" ? (
        <div className="Home">
        <NavBar/>
        <Cards />
</div>
      ) :
    <div className="Home">
            <NavBar/>
            <Cards />
            <Pagination />
            <Featured />
</div>
)
}