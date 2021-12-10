import Editor from "./Editor.jsx"
import React, {useEffect, useState} from "react";

function Content(props) {


    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])


    return (
        <>
            {/*<div className={"flex w-full justify-between"}>*/}
                {/*<div>Woot</div>*/}
                <div className={"mx-auto lg:w-2/3 w-full h-full"}>
                    <Editor/>
                </div>
                {/*<div>Moot</div>*/}
            {/*</div>*/}
            {/*{props.note.id*/}
            {/*    ? <Editor note={note}/>*/}
            {/*    : null}*/}
        </>

    )
}

export default Content