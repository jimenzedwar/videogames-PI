import React from "react";
import "./loading.css"
import gif from '../../recursos/giphy.gif'
const Loading = () => {
    return (
        <img className='gifLoader' src={gif} alt="Loading.." />
    )
}

export default Loading