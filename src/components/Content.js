import React, {useEffect, useState} from "react";
import QuillEditor from "./QuillEditor";
import {Link} from "react-router-dom";
import {CgFileDocument} from "react-icons/all";
import Search from "./Search";
import ThemeSwitcher from "./ThemeSwitcher";


function Content(props) {

    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])
    const [openSm, setOpenSm] = useState(false);

    const clickHandle = () => {
        setOpenSm(!openSm);
    }
    return (
        <div className={"w-full content"}>

            {props.note.id
                ? <QuillEditor
                    note={note}
                    setBookMark={props.setBookMark}
                    titleChange={props.titleChange}
                    lockChanged={props.lockChanged}
                    moveTrash={props.moveTrash}/>

                : (
                    <div className={"flex flex-col justify-center items-center h-96"}>
                        <div className={"font-bold text-shade-20 text-3xl mb-4"}>No document is open</div>

                        <div className={"text-shade-20 mt-2"}>
                            <div className={"flex items-center justify-start"}>
                                <span><CgFileDocument/></span>
                                <span className={"ml-2"}>
                                    <Link to={"#"} className={"md:mr-0 hover:text-hover-accent"} onClick={props.createNote}>Create new document</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }
            <ThemeSwitcher/>
        </div>

    )
}

export default Content
