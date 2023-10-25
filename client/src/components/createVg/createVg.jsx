import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewVg, getAllgenres } from "../../redux/actions";
import  {useNavigate} from "react-router-dom";
import Validation from "./validations";
import './createVg.css'
const NewVg = () => {
  const navigate = useNavigate()
  const genres = useSelector((state) => state.genres);
  const newVgArray = useSelector((state) => state.pagination);
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
          
          setNewVg((prevState) => ({
            ...prevState,
            platforms: [...prevState.platforms, event.target.value],
          }));
        } else if (event.target.name === "genres") {
          
          setNewVg((prevState) => ({
            ...prevState,
            genres: [...prevState.genres, event.target.value],
          }));
        }
      } else {
        if (event.target.name === "platforms") {
          
          setNewVg((prevState) => ({
            ...prevState,
            platforms: prevState.platforms.filter(
              (platform) => platform !== event.target.value
            ),
          }));
        } else if (event.target.name === "genres") {
          
          setNewVg((prevState) => ({
            ...prevState,
            genres: prevState.genres.filter(
              (genre) => genre !== event.target.value
            ),
          }));
        }
      }
    } else {
      
      setNewVg({
        ...newVg,
        [event.target.name]: event.target.value,
      });
    }
  };
const validations = () => {
  const validationErrors = Validation(newVg);
  setErrors(validationErrors);
}
  const createvgBtn = (event) => {
    event.preventDefault();
    if(errors){
    if (Object.values(errors).every((error) => error === "")) {
      dispatch(createNewVg(newVg));
      alert("Your game has been created succesfully")
      navigate("/home")
    }
  };
  }
  const goHome = () => {
    navigate("/home")
}
  return (
    <div className="newVgC">
      <div className="formC">
      <button onClick={() => goHome()} className="HomebtnF">Go Home</button>
    <form className="CreatenewVg">
      <div className="titleCVg">Create Your Own VideoGame</div>
      <label className="nameF">Name</label>
      <input className="inputNameCVG" type="text" name="name" value={newVg.name} onChange={handleChange}  onBlur={validations} placeholder="Videogame's name" />
      <p className="errorNameC">{errors?.name}</p>
      <label className="imgF">Image</label>
      <input className="inputImgCVG" type="text" name="background_image" value={newVg.background_image} onChange={handleChange} onBlur={validations} placeholder="Insert an URL"/>
      <p className="errorImageC">{errors?.background_image}</p>
      <label className="descF">Description</label>
      <input className="inputDescCVG" type="text" name="description" value={newVg.description} onChange={handleChange} onBlur={validations} placeholder="Describe your videogame"/>
      <p className="errorDescC">{errors?.description}</p>
      <label className="releasedF">Released</label>
      <input className="inputReleasedCVG" type="date" name="released" value={newVg.released} onChange={handleChange} onBlur={validations}/>
      <p className="errorReleasedC">{errors?.released}</p>
      <label className="ratingNameF">Rating</label>
      <input className="ratingF" type='number' name="rating" step='0.5' placeholder="Rate your game (0 to 10)" value={newVg.rating} onChange={handleChange} onBlur={validations}/>
      <p className="errorRatingC">{errors?.rating}</p>
      <label className="platformsnameF">Platforms</label>
      <div className='plattformsF'>
      {platforms.map((ele, i) => (
        <label className="containerC" key={i}>
          <input type="checkbox" name="platforms" value={ele} onChange={handleChange} onBlur={validations}/>
          <label>{ele}</label>
          <div className="checkmark"></div>
        </label>
      ))}
      <p className="errorPlatformsC">{errors?.platforms}</p>
      </div>
      <label className="genresnameF">Genres</label>
      <div className="genresF">
      {genres.map((ele, i) => (
        <label className='containerC' key={i}>
          <input type="checkbox" name="genres" value={ele} onChange={handleChange} onBlur={validations}/>
          <label>{ele}</label>
          <div className="checkmark"></div>
        </label>
      ))}
      <p className="errorGenresC">{errors?.genres}</p>
      </div>
      <button className='createvgbtnF' onClick={createvgBtn}
      disabled={Object.values(errors).some((error) => error) || Object.values(newVg).some((datos) => datos === "")}>create</button>
    </form>
    </div>
    </div>
  );
};

export default NewVg;