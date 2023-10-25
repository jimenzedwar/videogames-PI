import { useSelector } from "react-redux";
import Card from "../card/card";
import React from "react";
import "./cards.css"
import Loading from "../Loading/loading";

const Cards = () => {
  const renderedItems = useSelector((state) => state.pagination);
  const cardsToRender = renderedItems.slice(0, 15)

    return (
      typeof renderedItems === "string" ? (
        <h1 className="notFound">{renderedItems}</h1>
      ) : (
        <div>
          {!cardsToRender.length ? (
            <div>
              <Loading />
            </div>
          ) : (
    <div className='Cards'>
        {cardsToRender.map((vg, index) => {
            return(
            <Card
            key={index}
            id={vg.id}
            name={vg.name}
            background_image={vg.background_image}
            genres={vg.genres}
            rating={vg.rating}
            />
            )
            })}
      </div>
          )}
      </div>
    )
    )
}
export default Cards;