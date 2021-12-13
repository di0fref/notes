import Editor from "./Editor.tsx"
import React, {useEffect, useState} from "react";
import Quill from "./Quill";

function Content(props) {


    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])


    return (
        <div className={"w-full bg-gray-_300"}>
           {/*{props.note.id*/}
           {/*     ? <Editor*/}
           {/*        note={note}*/}
           {/*        titleChange={props.titleChange}*/}
           {/*        setBookMark={props.setBookMark}/>*/}
           {/*     : null}*/}
            {props.note.id
            ? <Quill
                    note={note}
                    setBookMark={props.setBookMark}
                    titleChange={props.titleChange}/>
                : null}
        </div>

    )
}

export default Content