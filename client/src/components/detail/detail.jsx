import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Detail = () => {
    const { id } = useParams()

    const [ vgDetail, setVgDetail ] = useState({});

    useEffect(() => {
        const API_URL = `/videogames/${id}`;   
        axios.get(API_URL)
            .then(response => response.data) 
            .then(data => {
                setVgDetail(data); 
            })
            .catch(error => {
                console.log(error) 
            });

        return () => {//cuando componente se desmonta o cambia id
            setVgDetail({});
        }
    }, [id]);//id como arreglo de dependencias, se ejecutara esto cada vez que cambie el id 

    const { name, background_image, platforms, released, rating, genres, description } = vgDetail;
    return (
<div className="detail">
        <h2 className="NombreD">Name: {name}</h2>

        <div className="platforms">Platforms: {platforms?.map((platform, index) => {
                            return platforms.length - 1 === index
                            ? <span key={index}>{platform}</span>
                            : <span key={index}>{`${platform} | `}</span>
                        })}
                        </div>
        <h2 className="NombreSP">released: {released}</h2>
        <h2 className="NombreG">rating: {rating}</h2>
        <h2 className="NombreO">
          genres: {genres?.map((genre, index) => {
                            return genres.length - 1 === index
                            ? <span key={index}>{genre}</span>
                            : <span key={index}>{`${genre} | `}</span>
                        })}
          </h2>
          <div
          dangerouslySetInnerHTML={{ __html: description }}>
          </div>
        <img className="imagendere" src={background_image} alt={name} />
</div>
    )
}

export default Detail