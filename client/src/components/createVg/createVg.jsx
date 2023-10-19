import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewVg, getAllgenres } from "../../redux/actions";
import Validation from "./validations";

const NewVg = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const platforms = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "PlayStation 3",
    "Xbox One",
    "Xbox Series S/X",
    "Xbox 360",
    "Xbox",
    "Nintendo Switch",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "iOS",
    "Android",
    "macOS",
    "Linux",
  ];

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getAllgenres());
    }
  }, []);

  const [newVg, setNewVg] = useState({
    name: "",
    background_image: "",
    platforms: [],
    released: "",
    rating: "",
    description: "",
    genres: [],
  });

  const [errors, setErrors] = React.useState({ 
    name: "",
    background_image: "",
    platforms: "",
    released: "",
    rating: "",
    description: "",
    genres: "",
})

  
  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      if (event.target.checked) {
        if (event.target.name === "platforms") {
          // Agregar la plataforma al array de plataformas en el estado
          setNewVg((prevState) => ({
            ...prevState,
            platforms: [...prevState.platforms, event.target.value],
          }));
        } else if (event.target.name === "genres") {
          // Agregar el género al array de géneros en el estado
          setNewVg((prevState) => ({
            ...prevState,
            genres: [...prevState.genres, event.target.value],
          }));
        }
      } else {
        if (event.target.name === "platforms") {
          // Eliminar la plataforma del array de plataformas en el estado
          setNewVg((prevState) => ({
            ...prevState,
            platforms: prevState.platforms.filter(
              (platform) => platform !== event.target.value
            ),
          }));
        } else if (event.target.name === "genres") {
          // Eliminar el género del array de géneros en el estado
          setNewVg((prevState) => ({
            ...prevState,
            genres: prevState.genres.filter(
              (genre) => genre !== event.target.value
            ),
          }));
        }
      }
    } else {
      // Para otros campos de entrada, simplemente actualiza el estado
      setNewVg({
        ...newVg,
        [event.target.name]: event.target.value,
      });
    }
  };

  const createvgBtn = (event) => {
    event.preventDefault();

    if (newVg) {
      const validationErrors = Validation(newVg);
      if (validationErrors)
{      setErrors({
        name: validationErrors.name || "",
        background_image: validationErrors.background_image || "",
        platforms: validationErrors.platforms || "",
        released: validationErrors.released || "",
        rating: validationErrors.rating || "",
        description: validationErrors.description || "",
        genres: validationErrors.genres || "",
      });
  }
      if (!validationErrors) {
        dispatch(createNewVg(newVg));
      }
    }
  };
  
  return (
    <form className="CreatenewVg">
      <label>name: </label>
      <input type="text" name="name" value={newVg.name} onChange={handleChange} />
      <p style={{ color: "orange" }}>{errors.name ? errors.name : null}</p>
      <label>image: </label>
      <input type="text" name="background_image" value={newVg.background_image} onChange={handleChange}/>
      <p style={{ color: "orange" }}>{errors.background_image ? errors.background_image : null}</p>
      <label>description: </label>
      <input type="text" name="description" value={newVg.description} onChange={handleChange}/>
      <p style={{ color: "orange" }}>{errors.description ? errors.description : null}</p>
      <label>released: </label>
      <input type="date" name="released" value={newVg.released} onChange={handleChange}/>
      <p style={{ color: "orange" }}>{errors.released ? errors.released : null}</p>
      <label>rating: </label>
      <input type="range" name="rating" min='0' max='10' step='0.1' value={newVg.rating} onChange={handleChange}/>
      <label>platforms: </label>
      {platforms.map((ele, i) => (
        <div key={i}>
          <input type="checkbox" name="platforms" value={ele} onChange={handleChange} />
          <label>{ele}</label>
        </div>
      ))}
      <p style={{ color: "orange" }}>{errors.platforms ? errors.platforms : null}</p>
      <label>genres: </label>
      {genres.map((ele, i) => (
        <div key={i}>
          <input type="checkbox" name="genres" value={ele} onChange={handleChange} />
          <label>{ele}</label>
        </div>
      ))}
      <p style={{ color: "orange" }}>{errors.genres ? errors.genres : null}</p>
      <button onClick={createvgBtn}>create</button>
    </form>
  );
};

export default NewVg;