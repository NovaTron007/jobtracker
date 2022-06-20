import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import Wrapper from "../assets/Wrappers/PageBtnContainer"
import { useAppContext } from '../Context/AppContext'


const PageBtnContainer = () => {
    // context global state and function
    const { totalPages, page, changePage } = useAppContext()
    
    // create an array with length same as totalPages, iterate over and return page buttons
    const pagesArray = Array.from({length: totalPages}, (_, index) => { // callback: item, index (_ if no for item)
        return index + 1 // array returned with numbers
    })

    // next page
    const nextPage = () => {
        console.log("nextPage: ", page)
        let newPage = page + 1
        if(newPage > totalPages) {
            // go back to start
            newPage = 1
        }
        // call context func to dispatch action
        changePage(newPage)
    }

    // prev page
    const prevPage = () => {
        console.log("prevPage: ", page)
        let newPage = page - 1
        if(newPage < 1) {
            // go back to end 
            newPage = totalPages
        }
        // call context func to dispatch action
        changePage(newPage)
    }
    

    return (
        <Wrapper>
            <button className="prev-btn" onClick={prevPage}><HiChevronDoubleLeft />prev</button>
            <div className="btn-container">
                {/* map array containing numbers as items, if item value is same as context page add current class */}
                {pagesArray.map((item, index) => {
                    return <button className={item === page ? "pageBtn active" : "pageBtn"} key={index} onClick={() => changePage(item)}>
                        {item}
                    </button>
                })}
            </div>
            <button className="next-btn" onClick={nextPage}><HiChevronDoubleRight />next</button>
        </Wrapper>
    )
}

export default PageBtnContainer