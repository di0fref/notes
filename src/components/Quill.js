import ReactQuill from 'react-quill';
import {useEffect, useRef, useState} from "react";
import NotesService from "../service/NotesService";
import t from "./CustomToast"
import {Button, TextareaAutosize, Tooltip} from "@mui/material";
import {
    BiLockAlt,
    FaRegClock, FaRegFilePdf,
    FaRegStar,
    FaStar, FaSun,
    HiOutlineTrash, HiShare
} from "react-icons/all";
import Breadcrumbs from "./BreadCrumbs"
import Moment from "react-moment";
import moment from "moment";
import DropdownMenu from "./DropdownMenu";
import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoteMenu from "./Menus/NoteMenu";

const Quill = (props) => {

    const [value, setValue] = useState(null);
    const [title, setTitle] = useState("")
    let timer = setTimeout(null)
    const el = useRef(null);
    const [dateModified, setDateModified] = useState(props.note.updated_At)
    const [locked, setLocked] = useState(props.note.locked);
    const [deleted, setDeleted] = useState(props.note.deleted);
    const [titleSaved, setTitleSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const saveToBackend = () => {
        setSaving(true)
        if (props.note.id) {
            const data = {
                text: JSON.stringify(el.current.editor.getContents()),
                name: title
            }
            NotesService.update(props.note.id, data).then((result) => {
                setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
                // t("success", "Saved")
                setSaving(false)
            }).catch((err) => {
                t("error", "Could not save note")
                console.log(err);
            });
        }
    }

    const saveTitle = () => {
        // console.log("saveTitle")
        if (props.note.id) {
            NotesService.update(props.note.id, {name: title})
                .then((result) => {
                    setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
                    props.titleChange();
                    setTitleSaved(!titleSaved)
                })
        }
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        if (props.note.id) {
            setValue(JSON.parse(props.note.text))
            setTitle(props.note.name)
            setDateModified(props.note.updated_at)
            setLocked(props.note.locked)
            setDeleted(props.note.deleted)
        }
    }, [props.note.id, props.note.locked, props.note.deleted])

    useEffect(() => {
        const timer = setTimeout(() => saveToBackend(), 500);
        return () => clearTimeout(timer);
    }, [value])

    useEffect(() => {
        const timer = setTimeout(() => saveTitle(), 500);
        return () => clearTimeout(timer);

    }, [title])


    const modules = {
        toolbar: [
            [{'header': 1}, {'header': 2}],
            [{'header': [3, 4, 5]}],
            ['bold', 'italic'],
            ['blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ["link"]
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
        NotesService.update(props.note.id, {
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
        // console.log("moveToTrash")
        NotesService.update(props.note.id, {deleted: 1}).then((result) => {
            props.moveTrash()
            setDeleted(1)
            t("success", "Moved to trash")
        }).catch((err) => {
            console.log(err)
        })
    }


    const shareNote = () => {
        console.log("shareNote");
    }
    const downloadPDF = () => {
        console.log("downloadPDF")
    }
    return (
        <div className={"flex flex-col"}>
            <div className={"flex items-center h-14 md:mt-0 mt-0 noprint"}>
                <div className={"flex-grow"}>
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
                        <Breadcrumbs note={props.note} title={title} titleSaved={titleSaved}/>
                        <div className={"ml-auto mr-4 text-s"}>
                        <NoteMenu
                        motoTrash={moveToTrash}
                        lockForEditing={lockForEditing}
                        downloadPDF={downloadPDF}/>
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
                                <FaRegClock className={"mr-2"}/>
                            </span>
                            <Tooltip title={"Date modified"}>
                                <span>
                                    <Moment date={dateModified} format={"D MMMM YYYY [at] HH:mm"}/>
                                </span>
                            </Tooltip>
                            <div className={"ml-2 text-xs italic"}>{saving?"Saving...":"Saved"}</div>
                        </div>
                    </div>
                    <div className={"h-16_ flex px-4 md:px-4 my-3"}>
                        <TextareaAutosize
                            readOnly={locked || deleted ? true : false}
                            maxLength="100"
                            onChange={updateTitle}
                            placeholder={"Give your note a title"}
                            value={title || ""}
                            className={"title p-0 w-full title text-4xl font-bold bg-primary border-0 focus:outline-none focus:ring-0"}
                        />
                    </div>
                    <ReactQuill
                        placeholder="Click here to start writing"
                        readOnly={locked || deleted ? true : false}
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
