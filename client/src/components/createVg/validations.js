const Validation = (datos) => {

let errors = {
}

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const lengthRegex = /^.{20,2500}$/

if (!datos.name.length) {
    errors.name = "Your game needs a name"
} else {
    if (datos.name.length > 25) {
        errors.name = "The name can't be greater than 25 characters"
    }
}
if (!typeof datos.name === "string") {
    errors.name = "The name must be a string"
}

if (!lengthRegex.test(datos.description)) {
    errors.description = "The description must have between 20 and 2500 characters."
}
if (!datos.platforms.length) {
    errors.platforms = "The videogame must have at least 1 platform."
}
if(!urlRegex.test(datos.background_image)) {
    errors.background_image = "The image must be a valid URL."
}
if (datos.released === "") {
    errors.released = "Your game must have a released date"
}
if (datos.released) {
    const year = Number(datos.released.split('-').shift())
    const currentYear = new Date().getFullYear();
    if (year < 1958) {
        errors.released = "The year can't be earlier than 1958."
    }
    if (year > currentYear) {
        errors.released = "The year can't be greater than the current year."
    }
}
if (!datos.genres.length) {
    errors.genres = "The videogame must have at least 1 genre."
}

if (!datos.rating) {
    errors.rating = "Your game must have a released date"
}

if (datos.rating) {
    if(datos.rating > 10) {
        errors.rating = "Rating can't be greater than 10"
    }
    if(datos.rating < 0) {
        errors.rating = "Rating can't be lower than 0"
    }
}
return errors
}

export default Validation