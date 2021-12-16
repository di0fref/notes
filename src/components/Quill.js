import ReactQuill from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import t from "./CustomToast"
import {Tooltip} from "@mui/material";
import {FaClock, FaRegClock, FaRegStar, FaStar} from "react-icons/all";
import Breadcrumbs from "./BreadCrumbs"
import Moment from "react-moment";
import moment from "moment";

const Quill = (props) => {

    const [value, setValue] = useState(null);
    const [title, setTitle] = useState("")
    let timer = setTimeout(null)
    const el = useRef(null);
    const [dateModified, setDateModified] = useState(props.note.date_modified)

    const saveToBackend = () => {
        // console.log("saveToBackend")
        const data = {
            text: JSON.stringify(el.current.editor.getContents()),
            name: title
        }
        NotesService.update(props.note.id, data).then((result) => {
            // props.titleChange();
            setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
            // t("success", "Saved")
        }).catch((err) => {
            t("error", "Could not save note")
            console.log(err);
        });
    }

    const saveTitle = () => {
        // console.log("saveTitle")
        NotesService.setTitle(props.note.id, {name: title})
            .then((result) => {
                setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
            })
        props.titleChange();
    }
    useEffect(() => {
        if (props.note.id) {
            setValue(JSON.parse(props.note.text))
            setTitle(props.note.name)
            setDateModified(props.note.date_modified)
        }
    }, [props.note.id])


    useEffect(() => {
        // console.log("Debounced text")
        const timer = setTimeout(() => saveToBackend(), 500);
        return () => clearTimeout(timer);

    }, [value])

    useEffect(() => {
        // console.log("Debounced title")
        const timer = setTimeout(() => saveTitle(), 500);
        return () => clearTimeout(timer);
    }, [title])



    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }, { 'header': 2 }],
            ['bold', 'italic'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
        ],
    }

    return (
        <div className={"flex flex-col"}>
            <div className={"flex items-center h-14 md:mt-0 mt-0"}>
                <div className={"bg-secondary_ flex-grow"}>
                    <div className={"flex justify-start items-center"}>
                        <Tooltip title={props.note.bookmark ? "Unfavorite this note" : "Favorite this note"}>
                            <button className={"flex items-center justify-between ml-4 noprint"}
                                    onClick={() => props.setBookMark(props.note)}>
                                {props.note.bookmark
                                    ? <FaStar className={"icon icon-accent"}/>
                                    : <FaRegStar className={"icon text-normal"}/>
                                }
                            </button>
                        </Tooltip>
                        <div className={"ml-4 text-muted bread-crumb_ text-s"}>
                            <Breadcrumbs note={props.note}/>
                        </div>
                    </div>

                </div>
            </div>
            <div className={"flex justify-between editor overflow-y-auto"}>
                <div className={"mx-auto px-2"}>
                    <div className={"text-sm pl-4 text-muted mt-4 italic"}>
                        <div className={"flex items-center"}>
                                <span>
                                    <FaRegClock className={"mr-1"}/>
                                </span>
                            <Tooltip title={"Date modified"}>
                                <span>
                                    <Moment date={dateModified} format={"D MMMM YYYY [at] HH:mm"}/>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={"h-16 flex _mt-6 mb-4_ px-4 md:px-4 "}>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className={"truncate w-full title text-4xl font-bold"} placeholder={"Give your note a title"}/>
                    </div>
                    <ReactQuill
                        // onBlur={saveToBackend}
                        placeholder="Click here to start writing"
                        theme="bubble"
                        value={value}
                        onChange={setValue}
                        ref={el}
                        modules={modules}
                        bounds={".quill"}/>
                </div>
            </div>
        </div>
    )
}

export default Quill;