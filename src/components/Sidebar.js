import React, {useContext, useEffect, useState} from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Box,
    Typography,
    Modal,
    Tooltip,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
    FaBars,
    FaTimes,
    FaCaretDown,
    FaCaretRight,
    FaFolder,
    FaFolderOpen,
    CgFileDocument,
    FaPlus,
    FaPlusCircle,
    BiLock, HiLogout, HiCog, FaUserCircle, HiUser, HiPlus, FaEdit, FaPen
} from "react-icons/all";
import '@themesberg/flowbite';


import FolderService from "../service/FolderService";
import {ItemTypes} from "./Constants";
import {useDrop, useDrag} from "react-dnd";
import NotesService from "../service/NotesService";
import ArrowTooltips from "./Tooltip";
import MyLink from "./MyLink";
import BookMarks from "./BookMarks";
import Search from "./Search";
import {button, style_folder} from "./styles";
import {GlobalContext} from "./contexts/GlobalContext";
import Trash from "./Trash";
import {Link} from "react-router-dom";
import UserMenu from "./Menus/UserMenu";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import NewFolderButton from "./NewFolderButton";
import ThemeSwitcher from "./ThemeSwitcher";
import Avatar from "./Avatar";
import Shared from "./Shared";
import FolderMenu from "./Menus/FolderMenu";
import New from "./New";
import Side from "./Side";


let moment = require('moment');


function SidebarItem(props, {isDragging, tool}) {

    const [{opacity}, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: props.items,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.1 : 1,
            }),

            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {
                    switch (item.type) {
                        case "note":
                            console.log(`Moving note ${item.id} into folder ${dropResult.id}`);

                            if (item.id !== dropResult.id) {
                                NotesService.update(item.id, {folder_id: dropResult.id}).then((result) => {
                                    /* Send signal to update sidebar */
                                    props.droppedHandler();
                                });
                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
                            break;
                        case "folder":
                            console.log(`Moving folder ${item.id} into folder ${dropResult.id}`);
                            if (item.id !== dropResult.id) {
                                FolderService.update(item.id, {parent_id: dropResult.id}).then((result) => {
                                    /* Send signal to update sidebar */
                                    props.droppedHandler();
                                });

                            } else {
                                console.log("Drag ref == Drop ref:: Skipping");
                            }
                            break;
                    }
                }
            },
        }), []
    );


    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => {

        },
        drop: () => ({name: "SidebarLink", id: props.items.id, type: props.items.type}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));


    /* Attach both drag and drop ref to the component. */
    const attacheRef = (el) => {
        drag(el)
        drop(el)
    }

    const isActive = canDrop && isOver;
    const [open, setOpen] = useState(false); // Open or closed sidebar menu
    const context = useContext(GlobalContext);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const [editable, setContentEditable] = useState(false)

    const handleClick = (type, id, name) => {
        setOpen(!open);
        if (type === "folder") {
            props.folderClicked(id, name)
        } else (
            props.clickHandle()
        )
    };
    const handleOpen = () => {
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    })

    const formatDate = (date) => {
        return moment(date).format("YYYY-M-D H:m")
    }

    const setEditable = (e) => {
        setContentEditable(true)
    }
    return (
        <>
            <MyLink type={props.items.type} id={props.items.id}>

                <ListItem
                    dense={true}
                    button={true}
                    id={`item-${props.items.id}`}
                    ref={attacheRef}
                    role="card"
                    onClick={() => {
                        handleClick(props.items.type, props.items.id, props.items.name);
                    }}
                    key={`bb-${props.items.id}`}
                    selected={
                        (props.items.id === props.note_id && props.items.type === "note")
                        // (props.items.id === props.clicked_id)

                    }
                    className={`${isActive ? "sidebar-active" : ""} pointer listitem`}
                    style={
                        {
                            marginLeft: props.depth * props.depthStep + ".25rem",
                            marginTop: "2px",
                            width: `calc(100% - ${props.depth * props.depthStep + ".25rem"})`,
                            paddingLeft: "4px",
                            paddingRight: 0
                        }
                    }>
                    <ArrowTooltips
                        placement={windowSize < 768 ? "top" : "right"}
                        arrow
                        title={
                            (props.items.type === "note")
                                ? (
                                    <div className={"text-center"}>
                                        <p>Modified at: {formatDate(props.items.updated_at)}</p>
                                        <p>Created at: {formatDate(props.items.created_at)}</p>
                                        {props.items.locked
                                            ? <p>Locked for editing</p> : null
                                        }
                                    </div>
                                )
                                : ""
                        }>
                        <ListItemText
                            key={`cc-${props.items.id}`}>
                            <div className={'flex justify-start items-center'}>
                                <div className={""}>
                                    {(props.items.items && props.items.items.length > 0)
                                        ? open
                                            ? <FaCaretDown className={"icon-caret"}/>
                                            : <FaCaretRight className={"icon-caret"}/>
                                        : null}
                                </div>
                                <div>
                                    {(props.icon === true)
                                        ? (props.items.type === "folder")
                                            ? (
                                                open
                                                    ? <FaFolderOpen className={`icon text-muted icon-folder ml-2`}/>
                                                    : <FaFolder className={`icon text-muted icon-folder ml-2`}/>
                                            )
                                            : (
                                                <CgFileDocument className={`icon ml-2`}/>
                                            )
                                        : null}
                                </div>
                                <div className={`ml-2 text-s ${props.class} truncate`}>
                                    {props.items.name
                                        ? props.items.name
                                        : "Untitled"
                                    }
                                </div>
                                {props.items.locked
                                    ? (
                                        <span className={"ml-auto"}>
                                            <BiLock className={"text-red-500 opacity-50 mr-2"}/>
                                        </span>
                                    )
                                    : null
                                }

                            </div>
                        </ListItemText>
                    </ArrowTooltips>
                    {(props.items.type === "folder")
                        ?
                        (
                            <ListItemSecondaryAction className={`secondary-action`}>
                                <FolderMenu
                                    editFolder={props.editFolder}
                                    createFolder={props.createFolder}
                                    folder_id={props.items.id}
                                    folder={{
                                        id: props.items.id,
                                        name: props.items.name
                                    }}/>
                            </ListItemSecondaryAction>
                        )
                        : ""
                    }
                </ListItem>
            </MyLink>
            {(props.items.items && props.items.items) ? (
                <div key={`er-${props.items.id}`}>
                    <Collapse in={open} timeout="auto" key={`ee-${props.items.id}`}>
                        <List
                            // dense
                            disablePadding={true}
                            key={`ff-${props.items.id}`}
                        >
                            {props.items.items.map((subItem, index) => (
                                <div key={`ok-${index}`}>
                                    <SidebarItem
                                        key={`${subItem.name}${index}`}
                                        depth={props.depth + 1}
                                        depthStep={props.depthStep}
                                        items={subItem}
                                        // noteClicked={props.noteClicked}
                                        clicked_id={props.clicked_id}
                                        droppedHandler={props.droppedHandler}
                                        class={""}
                                        icon={true}
                                        note_id={props.note_id}
                                        clickHandle={props.clickHandle}
                                        folderClicked={props.folderClicked}
                                    />
                                </div>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ) : null}
        </>)
}


function Sidebar(props) {

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({name: "NotebookHeader", id: 0}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;


    const [open, setOpen] = useState(false); // Open or closed sidebar menu

    const logout = () => {
        console.log("logout")
    }
    const settings = () => {

    }
    const [openSm, setOpenSm] = useState(false);

    const clickHandle = () => {
        setOpenSm(!openSm);
    }
    return (
        <>
            {/*<div*/}
            {/*    onClick={() => setOpenSm(false)}*/}
            {/*    className={`${openSm ? "w-full h-full" : "w-0 h-0"} overlay_`}/>*/}
            <div
                className={`
            sidebar 
            z-10
            flex 
            flex-col 
            h-screen 
            md:w-76
            w-3/4
            md:ml-0 
            flex-shrink-0 
            absolute 
            md:static
            transition-all
            ease-on-out
            duration-300
            noprint
                ${openSm ? "ml-0" : "-ml-full"}`
                }>
                <div className={"menu px-3 my-2"}>
                    <UserMenu/>
                    <Tooltip title={"Toggle menu"}>
                        <button className={`p-2 fixed top-2 right-12 rounded md:hidden rounded-lg focus:outline-none focus:shadow-outline`} onClick={clickHandle}>
                            {!openSm
                                ? <FaBars className={"w-6 h-6"}/>
                                : <FaTimes className={"w-6 h-6"}/>
                            }
                        </button>
                    </Tooltip>
                </div>
                <div className={"search px-3"}><Search clickHandle={clickHandle} text={"Search"}/></div>
                <div className={"new-note p-3"}>
                    <div>
                        <New
                            folderData={props.folderData}
                            createNote={props.createNote}/>
                    </div>
                    {/*</Tooltip>*/}
                </div>
                <div className={"flex flex-col flex-grow overflow-y-auto p-3"}>
                    <BookMarks bookmarks={props.bookmarks} open={props.open}/>
                    <List
                        // dense
                        key={props.depthStep}>
                        <ListItem
                            className={`${isActive ? "sidebar-active" : ""} pointer`}
                            ref={drop}
                            role="card"
                            onClick={
                                () => {
                                    setOpen(!open);
                                    props.folderClicked(0)
                                }
                            }
                            // selected={!open ? true : false}
                            button
                            dense={true}
                            sx={{
                                paddingLeft: "4px",
                                paddingRight: 0,
                            }}>
                            <ListItemText className={""} key={`cc-${props.items.id}`}>
                                <div className={'flex justify-start items-center'}>
                                    <div className={""}>
                                        {open
                                            ? <FaCaretDown className={"icon-caret"}/>
                                            : <FaCaretRight className={"icon-caret"}/>
                                        }
                                    </div>
                                    <HiUser className={`icon ml-2`}/>
                                    <div className={`ml-2 text-s ${props.class} truncate`}>
                                        My documents
                                    </div>
                                </div>
                            </ListItemText>
                            <ListItemSecondaryAction className={`secondary-action`}>
                                <FolderMenu
                                    type={"root"}
                                    editFolder={props.editFolder}
                                    createFolder={props.createFolder}
                                    folder_id={props.items.id}
                                    folder={{
                                        id: props.items.id,
                                        name: props.items.name
                                    }}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {props.items.map((sidebarItem, index) => (
                                <SidebarItem
                                    key={`${sidebarItem.name}${index}`}
                                    depthStep={1}
                                    depth={1}
                                    // noteClicked={props.noteClicked}
                                    items={sidebarItem}
                                    clicked_id={props.clicked_id}
                                    droppedHandler={props.droppedHandler}
                                    class={""}
                                    icon={true}
                                    note_id={props.note_id}
                                    clickHandle={clickHandle}
                                    folderClicked={props.folderClicked}
                                    editFolder={props.editFolder}
                                    createFolder={props.createFolder}
                                />
                            ))}</Collapse>
                    </List>

                    <div className={"mt-auto mb-4"}>
                        <Shared/>
                        <Trash trash={props.trash}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
