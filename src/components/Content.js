import ReplaceContentImperative from "./Editor.tsx"
import React, {useEffect, useState} from "react";

function Content(props) {


    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])


    return (
        <>
<div className={"flex-grow"}>

                    {note
                    ? <ReplaceContentImperative
                        note={note}
                    />
                    : ""}
    </div>
            </>

    )
}

export default Content