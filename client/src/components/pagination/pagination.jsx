import React, {useEffect} from "react"
import { useDispatch, useSelector,  } from "react-redux"
import { renderedItems, updatePage } from "../../redux/actions"
import "./pagination.css"
const Pagination = () => {
    const dispatch = useDispatch()
    const itemsPerPage = useSelector((state) => state.itemsPerPage)
    const currentVg = useSelector((state) => state.currentVg)
    const currentPage = useSelector((state) => state.currentPage)
    
    useEffect(() => {
        if (currentVg.length > 0) {
          handlePageChange(1);
        }
      }, [currentVg]);
        
    const handlePageChange = (page) => {
        const startIndex = (page - 1) * itemsPerPage; 
        const endIndex = Math.min(startIndex + itemsPerPage, currentVg.length); 
        const displayedItems = currentVg.slice(startIndex, endIndex);
        dispatch(updatePage(page))
        dispatch(renderedItems(displayedItems))
    }

    const totalPages = Math.ceil(currentVg.length / itemsPerPage);
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
        <button className="btnP"
        disabled= {i === currentPage}
        key={i} onClick={() => {handlePageChange(i)}}>
        <span className="span">{i}</span>
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