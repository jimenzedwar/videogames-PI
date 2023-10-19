import { useSelector } from "react-redux";
import Card from "../card/card";
import React from "react";


const Cards = () => {
  const renderedItems = useSelector((state) => state.pagination);
  const items = useSelector((state) => state.currentVg);
const firstItemsRendered = items.slice(0, 15)

if (!renderedItems.length) {
  return (
    <div className='Cards'>
        {firstItemsRendered.map((vg, index) => {
            return(
            <Card
            key={index}
            id={vg.id}
            name={vg.name}
            background_image={vg.background_image}
            genres={vg.genres}
            rating={vg.rating}
            />)
            })}
      </div>
    );
} else {
    return (
      typeof items === "string" ? (
        <h1 className="notFound">{items}</h1>
      ) : (
    <div className='Cards'>
        {renderedItems.map((vg, index) => {
            return(
            <Card
            key={index}
            id={vg.id}
            name={vg.name}
            background_image={vg.background_image}
            genres={vg.genres}
            rating={vg.rating}
            />)
            })}
      </div>)
    );
}
}
export default Cards;