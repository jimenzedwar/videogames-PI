import React from "react";
import { useNavigate } from 'react-router-dom';
import "./card.css"

export default function Card (props) {
   const {name, genres, background_image, rating, id} = props
   const navigate = useNavigate()
   const handleDetail = (id) => {
      navigate(`/detail/${id}`)
   }
   return (
      <div className="container">
      <div className="Card">
         <h1 className="Name">{name}</h1>
         <img src={background_image} alt={name} className="refImage" />
         <h2 className="Genres">{ !genres?.length ? <span>No information about the genres has been provided.</span> : genres?.map((genre, index) => {
            return genres.length - 1 === index ? (//si el género actual es el último en el array asi no pone una | a lo ultimo.
            <span key={index}>{genre}</span>
            ) : (
               <span key={index}>{`${genre} | `}</span>
               );
            })}</h2>
         <h2 className="Rating">{rating > 0 ? <span className="StarRating">{rating}</span> : <span className="StarRating">☆</span>}</h2>
            <button className="detailbtn" onClick={() => handleDetail(id)}>+</button>
      </div>
      </div>
   );
}

