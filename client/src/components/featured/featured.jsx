import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./featured.css"

const Featured = () => {
const allVg = useSelector((state) => state.pagination);

const suma = allVg?.reduce((total, objeto) => total + objeto.rating, 0);
  const promedio = suma / allVg.length;

const featuredVg = allVg?.filter((ele) => ele.rating > promedio);

const navigate = useNavigate()
const handleDetail = (id) => {
   navigate(`/detail/${id}`)
}
return (
    <div className="containerF">
      <h1 className="FeaturedT">Featured & Recommended</h1>

      <div className="gallery-wrap">
        {featuredVg.map((game, index) => (
          <div
          onClick={() => handleDetail(game.id)}
            key={index}
            className={`item item-${index + 1}`} 
            style={{
              backgroundImage: `url(${game.background_image})`
            }}
          ></div>))}
      </div>
      </div>)
      }

export default Featured;

