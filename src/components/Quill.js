import ReactQuill from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import t from "./CustomToast"
import {Button, Tooltip} from "@mui/material";
import {
    BiLockAlt,
    FaLock, FaMoon,
    FaRegClock, FaRegFilePdf,
    FaRegStar,
    FaStar, FaSun,
    HiOutlineTrash
} from "react-icons/all";
import Breadcrumbs from "./BreadCrumbs"
import Moment from "react-moment";
import moment from "moment";
import DropdownMenu from "./DropdownMenu";
import * as React from "react";

const Quill = (props) => {

    const [value, setValue] = useState(null);
    const [title, setTitle] = useState("")
    let timer = setTimeout(null)
    const el = useRef(null);
    const [dateModified, setDateModified] = useState(props.note.date_modified)
    const [locked, setLocked] = useState(props.note.locked);
    const [deleted, setDeleted] = useState(props.note.deleted);

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
            setLocked(props.note.locked)
            setDeleted(props.note.deleted)
        }
    }, [props.note.id, props.note.locked, props.note.deleted])

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
            // [{'header': 1}, {'header': 2}, {'header': 3}],
            [{'header': [1, 2, 3]}],
            ['bold', 'italic'],
            ['blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
        ],
    }
    const formats = [
        'header',
        'bold', 'italic',
        'blockquote', 'code-block',
        'list', 'bullet',
        'link', 'image'
    ];

    const lockForEditing = () => {
        NotesService.setLocked(props.note.id, {
            locked: !locked
        })
            .then((result) => {
                setLocked(!locked);
                (locked
                        ? t("success", "Unlocked editing")
                        : t("success", "Locked for editing")
                )
                props.lockChanged();
            }).catch((err) => {
            console.log(err)
        });

    }
    const moveToTrash = () => {
        console.log("moveToTrash")
        NotesService.trash(props.note.id).then((result) => {
            props.moveTrash()
            setDeleted(1)
            t("success", "Moved to trash")
        }).catch((err) => {
            console.log(err)
        })
    }
    const downloadPDF = () => {
        console.log("downloadPDF")
    }
    return (
        <div className={"flex flex-col"}>
            <div className={"flex items-center h-14 md:mt-0 mt-0 noprint"}>
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
                            <Breadcrumbs note={props.note} title={title}/>
                        </div>
                        <div className={"ml-auto mr-4 text-s"}>

                            <DropdownMenu options={
                                [
                                    {
                                        label: "Download PDF",
                                        icon: <FaRegFilePdf className={"text-normal"}/>,
                                        onClick: () => downloadPDF()
                                    },
                                    {
                                        label: locked ? "Unlock editing" : "Lock for editing",
                                        icon: <BiLockAlt className={"text-normal"}/>,
                                        onClick: () => lockForEditing()
                                    },
                                    {
                                        // divider: true,
                                        label: "Move to trash",
                                        icon: <HiOutlineTrash className={"text-normal"}/>,
                                        onClick: () => moveToTrash()
                                    },
                                ]
                            }/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex justify-between editor overflow-y-auto"}>
                <div className={"mx-auto px-2"}>
                    <div className={"text-sm pl-4 text-muted mt-4 italic noprint"}>
                        <div className={"flex items-center"}>
                            <Tooltip title={"Locked for editing"}>
                                <span>
                                    {locked ? <BiLockAlt className={"mr-2 h-4 w-4 text-red-500"}/> : ""}
                                </span>
                            </Tooltip>
                            <Tooltip title={"This note is in trash"}>
                                   <span>
                                    {deleted ? <HiOutlineTrash className={"mr-2 h-4 w-4 text-red-500"}/> : ""}
                                </span>
                            </Tooltip>
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
                        <input
                            readOnly={locked||deleted ? 1 : 0}
                            value={title} onChange={(e) => setTitle(e.target.value)} className={"truncate w-full title text-4xl font-bold"} placeholder={"Give your note a title"}/>
                    </div>
                    <ReactQuill
                        placeholder="Click here to start writing"
                        readOnly={locked||deleted ? true : false }
                        theme="bubble"
                        value={value}
                        onChange={setValue}
                        ref={el}
                        modules={modules}
                        formats={formats}
                        bounds={".quill"}/>
                </div>
            </div>
        </div>
    )
}

export default Quill;
