import React from "react"
import { useDispatch, useSelector,  } from "react-redux"
import { renderedItems, updatePage } from "../../redux/actions"

const Pagination = () => {
    const dispatch = useDispatch()
    const itemsPerPage = useSelector((state) => state.itemsPerPage)
    const currentVg = useSelector((state) => state.currentVg)

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * itemsPerPage; // calcula el índice del primer elemento que se mostrará en la página actual. 
        const endIndex = Math.min(startIndex + itemsPerPage, currentVg.length); // Asegura que no exceda el tamaño del array
        const displayedItems = currentVg.slice(startIndex, endIndex);
        dispatch(updatePage(page))
        dispatch(renderedItems(displayedItems))
    }

    const totalPages = Math.ceil(currentVg.length / itemsPerPage);
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
        <button key={i} onClick={() => {handlePageChange(i)}}>
        {i}
        </button>
    );
    }

    return (
        <div className="pagination">
        {paginationButtons}
        </div>
    )
}

export default Pagination