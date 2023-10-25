import React from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './detail.css'
import Loading from "../Loading/loading";
const Detail = () => {
    const navigate = useNavigate()
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

        return () => {
            setVgDetail({});
        }
    }, [id]);

    const goHome = () => {
        navigate("/home")
    }
    const { name, background_image, platforms, released, rating, genres, description } = vgDetail;
    return (
        <div className="ContainerD">
        <button onClick={() => goHome()} className="HomebtnD">
        <div className="signHome">⌂</div>
        <div className="textH">Go Home</div>
        </button>
<div className="detailC"> { !name ? <Loading /> :
<div className="card-inner">
<div className="card-front">
        <h2 className="NombreD">{name}</h2>
        <div className="platformsD">{ !platforms?.length ? <span>No information about the platforms has been provided.</span> : platforms?.map((platform, index) => {
                            return platforms.length - 1 === index
                            ? <span key={index}>{platform}</span>
                            : <span key={index}>{`${platform} | `}</span>
                        })}
                        </div>
        <h2 className="releasedD">Released:{released}</h2>
            <img className="imageD" src={background_image} alt={name} />
            </div>
            <div className="card-back">
        <h2 className="ratingD">{rating > 0 ? <span>{rating}</span> : <span className="StarRatingD">☆</span>}</h2>
        <h2 className="genresD">
        { !genres?.length ? <span>No information about the genres has been provided.</span> : genres?.map((genre, index) => {
                            return genres.length - 1 === index
                            ? <span key={index}>{genre}</span>
                            : <span key={index}>{`${genre} | `}</span>
                        })}
          </h2>
          <div className="descriptionD"
          dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          </div>
          </div> }
</div>
</div>
    )
}

export default Detail