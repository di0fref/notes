import React, {useEffect, useState} from "react";
import {FaStar} from "react-icons/all";

function BookMarks(props) {

    const [bookMark, setBookMarks] = useState([props.bookmarks])
    useEffect(() => {
        // console.log("BookMarks::useEffect")
        setBookMarks(props.bookmarks)
    }, [props.bookmarks])

    return(
        <>
        {props.bookmarks.map((bookmark, index) => (
                <div className={"flex items-center justify-start my-2"} key={`bookmark-${index}`}>
                    <div><FaStar className={"icon icon-accent"}/></div>
                    <div className={"ml-2 text-s"}>{bookmark.label}</div>
                </div>
            ))}
        </>
    )
}

export default BookMarks