import React, {useEffect, useState} from "react";
import Quill from "./Quill";
import {Link} from "react-router-dom";
import Tooltip from "./Tooltip";
import {BiSearch, CgFileDocument, FaMoon, FaSun} from "react-icons/all";
import Search from "./Search";

function Content(props) {


    const [note, setNote] = useState(props.note)
    useEffect(() => {
        setNote(props.note)
    }, [props.note])
    const [theme, setTheme] = useState()

    useEffect(() => {
        let toggle = document.getElementById("theme-toggle");
        let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme)
        }
        setTheme(storedTheme)
        toggle.onclick = function () {
            let currentTheme = document.documentElement.getAttribute("data-theme");
            let targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }
            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);
        };
    }, [theme])
    const [openSm, setOpenSm] = useState(false);

    const clickHandle = () => {
        setOpenSm(!openSm);
    }
    return (
        <div className={"w-full z-10"}>
            <button id="theme-toggle" className="noprint mr-8_ md:mr-0_ absolute bottom-6 right-6" type="button">
                <Tooltip title={"Dark theme"}>
                    <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>
                </Tooltip>
                <Tooltip title={"Light theme"}>
                    <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>
                </Tooltip>
            </button>
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
                                    <Link to={"#"} className={"mr-20 md:mr-0  hover:text-hover-accent"} onClick={props.createNote}>Create new note</Link>
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
        </div>

    )
}

export default Content
