import React, {useEffect, useState} from "react";
import Quill from "./Quill";
import {Link} from "react-router-dom";
import Tooltip from "./Tooltip";
import {BiSearch, CgFileDocument, FaMoon, FaSun} from "react-icons/all";
import Search from "./Search";
import ThemeSwitcher from "./ThemeSwitcher";
import Medium from "./Medium";

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
        <div className={"w-full z-10_"}>

            {props.note.id
                ? <Quill
                    note={note}
                    setBookMark={props.setBookMark}
                    titleChange={props.titleChange}
                    lockChanged={props.lockChanged}
                    moveTrash={props.moveTrash}/>

                : (
                    <div className={"flex flex-col justify-center items-center h-96"}>
                        <div className={"font-bold text-shade-20 text-3xl mb-4"}>No note is open</div>

                        <div className={"text-shade-20 mt-2"}>
                            <div className={"flex items-center justify-start"}>
                                <span><CgFileDocument/></span>
                                <span className={"ml-2"}>
                                    <Link to={"#"} className={"md:mr-0 hover:text-hover-accent"} onClick={props.createNote}>Create new note</Link>
                                </span>
                            </div>
                        </div>
                        <div className={"text-shade-20 mt-1"}>
                            <div className={"flex items-center justify-start"}>
                                <span><Search clickHandle={clickHandle} text={"See recent notes"}/></span>
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
