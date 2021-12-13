import ReactQuill from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import t from "./CustomToast"
import {Tooltip} from "@mui/material";
import {FaRegStar, FaStar} from "react-icons/all";
import FolderService from "../service/FolderService";

const Quill = (props) => {

    const [value, setValue] = useState(null);
    const [title, setTitle] = useState(props.note.name)
    let timer = setTimeout(null)
    const el = useRef(null);

    const saveToBackend = (range, type, editor) => {
        const data = {
            text: JSON.stringify(editor.getContents()),
            name: title
        }
        NotesService.update(props.note.id, data).then((result) => {
            // props.titleChange();
            t("success", "Saved")
            console.log(result)
        }).catch((err) => {
            t("error", "Could not save note")
            console.log(err);
        });
    }

    const save = (content, delta, source, editor) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            saveToBackend(JSON.stringify(editor.getContents()));
        }, 2000);
    }

    const titleChange = (e) => {
        NotesService.setTitle(props.note.id, {name: title})
            .then((result) => {
                console.log(result)
            })
        // setTitle(e.target.value)
        props.titleChange();
    }

    useEffect(() => {
        if (props.note.id) {
            FolderService.getBread(3).then((result) => {
                console.log(result)
            })
            setValue(JSON.parse(props.note.text))
            setTitle(props.note.name)
        }
    }, [props.note.id])

    return (
        <div className={"flex flex-col"}>
            <div className={"flex items-center h-14"}>
                <div className={"bg-secondary_ flex-grow"}>
                    <div className={"flex justify-start items-center"}>
                        <Tooltip title={props.note.bookmark ? "Unfavorite this note" : "Favorite this note"}>
                            <button className={"flex items-center justify-between ml-4"}
                                    onClick={() => props.setBookMark(props.note)}>
                                {props.note.bookmark
                                    ? <FaStar className={"icon icon-accent"}/>
                                    : <FaRegStar className={"icon text-normal"}/>
                                }
                            </button>
                        </Tooltip>
                        <div className={"ml-4 text-muted bread-crumb_ text-s"}>
                            My private docs
                            /
                            Untitled
                            /
                            jnllnl
                        </div>
                    </div>

                </div>
            </div>
            <div className={"flex justify-between editor overflow-y-auto"}>
                <div className={"mx-auto"}>
                    <div className={"h-16 flex mt-6 mb-4 pl-3"}>
                        <input value={title} onBlur={titleChange} onChange={(e) => setTitle(e.target.value)} className={"w-full _bg-gray-900 text-4xl font-bold"} placeholder={"Give your note a title"}/>
                    </div>
                    <ReactQuill onBlur={saveToBackend} placeholder="Click here to start writing" theme="bubble" value={value} onChange={setValue} ref={el}/>
                </div>
            </div>
        </div>
    )
}

export default Quill;