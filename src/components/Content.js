import React, {useEffect, useState} from "react";
import Quill from "./Quill";
import {Link} from "react-router-dom";

function Content(props) {


    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])


    return (
        <div className={"w-full z-10"}>
            {props.note.id
            ? <Quill
                    note={note}
                    setBookMark={props.setBookMark}
                    titleChange={props.titleChange}
                    lockChanged={props.lockChanged}
                    moveTrash={props.moveTrash}/>
                : (
                    <div className={"flex flex-col justify-center items-center h-96"}>
                        <div className={"font-bold text-shade-20 text-3xl"}>No note is open</div>

                        <div className={"text-shade-20 mt-2 hover:text-hover-accent"}>
                            <Link to={"#"}>Create new note</Link>
                        </div>
                        <div className={"text-shade-20 mt-1 hover:text-hover-accent"}>
                            <Link to={"#"}>See recent notes</Link>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default Content
