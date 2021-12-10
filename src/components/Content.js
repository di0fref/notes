import Editor from "./Editor.tsx"
import React, {useEffect, useState} from "react";

function Content(props) {


    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])


    return (
        <div className={"w-full"}>
           {props.note.id
                ? <Editor note={note}/>
                : null}
        </div>

    )
}

export default Content