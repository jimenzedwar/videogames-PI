import React from "react";
import { useNavigate } from 'react-router-dom';


export default function Card (props) {
   const {name, genres, background_image, rating, id} = props
   const navigate = useNavigate()
   const handleDetail = (id) => {
      navigate(`/detail/${id}`)
   }
   return (
      <div className="Card">
         <h1>{name}</h1>
         <img src={background_image} alt='' className="imagenderef" />
         <h2>{genres?.map((genre, index) => {
            return genres.length - 1 === index ? (//i el género actual es el último en el array asi no pone una | a lo ultimo.
            <span key={index}>{genre}</span>
            ) : (
               <span key={index}>{`${genre} | `}</span>
               );
            })}</h2>
         <h2>{rating}</h2>
            <button className="detailbtn" onClick={() => handleDetail(id)}>+</button>
      </div>
   );
}

