import React from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../filters/filters";
import "./navBar.css"
const NavBar = () => {
    const navigate = useNavigate()
    const createVgbtn = () => {
        navigate("/create")
    }
    return (
        <div className="menu">
        <div className="Navbar">
        <button  className='createVgbtn' onClick={createVgbtn}>
        <div className="sign">+</div>
        <div className="text">Create</div>
        </button>
        <Filter />
        </div>
        </div>

    )
}
export default NavBar