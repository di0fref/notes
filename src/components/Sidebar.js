import React, {useEffect, useState} from 'react'
import {List, ListItem, ListItemText, Collapse, ListItemIcon, Box, Typography, Modal, Tooltip} from '@mui/material';
import {
    FaBars,
    FaFileAlt,
    FaRegFolder,
    FaTimes,
    FaMoon,
    FaSun,
    FaCaretDown,
    FaCaretUp,
    FaCaretLeft,
    FaCaretRight,
    FaFolder,
    FaFolderOpen,
    AiOutlineFileText,
    CgFileDocument,
    FaPlus, FaPlusSquare, BsPlusSquare, BsPlusSquareFill
} from "react-icons/all";

import FolderService from "../service/FolderService";
import {ItemTypes} from "./Constants";
import {useDrop, useDrag} from "react-dnd";
import NotesService from "../service/NotesService";
import ArrowTooltips from "./Tooltip";
import MyLink from "./Link";
import BookMarks from "./BookMarks";
import Search from "./Search";

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
                                NotesService.updateFolder(item.id, {folder_id: dropResult.id}).then((result) => {
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
                                FolderService.updateFolder(item.id, {folder_id: dropResult.id}).then((result) => {
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
    const handleClick = (type, id) => {
        setOpen(!open);
        props.noteClicked(type, id)
        if (type === "note") {
            props.clickHandle()
        }
    };


    // useEffect(() => {
    // }, [props.clicked_id])

    const formatDate = (date) => {
        return moment(date).format("YYYY-M-d H:m")
    }

    return (
        <>
            <MyLink type={props.items.type} id={props.items.id}>
                <ArrowTooltips
                    placement={"right"}
                    arrow
                    title={
                        (props.items.type === "note")
                            ? (
                                <div className={"text-center"}>
                                    <p>Modified at: {formatDate(props.items.date)}</p>
                                    <p>Created at: {formatDate(props.items.date)}</p>
                                </div>
                            )
                            : ""
                    }>
                    <ListItem button dense
                              id={`item-${props.items.id}`}
                              ref={attacheRef}
                              style={{opacity}}
                              role="card"
                              onClick={() => {
                                  handleClick(props.items.type, props.items.id);
                              }}
                              key={`bb-${props.items.id}`}
                              selected={
                                  (props.items.id === props.note_id) ? true : false
                              }
                              disableRipple disableTouchRipple
                              className={`${isActive ? "sidebar-active _Mui-selected " : ""} pointer`}
                              style={
                                  {
                                      marginLeft: props.depth * props.depthStep * 1 + "rem",
                                      width: "inherit",
                                      marginTop: "2px"
                                  }
                              }
                    >

                        <ListItemText
                            // style={{marginLeft: props.depth * props.depthStep*1.5+"rem"}}
                            key={`cc-${props.items.id}`}>
                            <div className={'flex justify-start items-center'}>
                                <div className={"mr-2"}>
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
                                                    ? <FaFolderOpen className={`icon text-muted icon-folder`}/>
                                                    : <FaFolder className={`icon text-muted icon-folder`}/>

                                            )
                                            : <CgFileDocument className={`icon`}/>
                                        : null}
                                </div>
                                <div className={`ml-2 text-s ${props.class} truncate`}>
                                    {props.items.label}
                                </div>
                                {/*{props.items.type === "folder"*/}
                                {/*    ? (*/}
                                {/*        <Tooltip title={`Create new note in ${props.items.label}`}>*/}
                                {/*            <div className={"ml-auto mr-1"}>*/}
                                {/*                <BsPlusSquareFill className={"w-5 h-5 hover:blue-hover"}/>*/}
                                {/*            </div>*/}
                                {/*        </Tooltip>*/}
                                {/*    )*/}
                                {/*    : ""}*/}
                            </div>
                        </ListItemText>
                    </ListItem>
                </ArrowTooltips>
            </MyLink>
            {(props.items.items && props.items.items.length > 0) ? (
                <div key={`er-${props.items.id}`}>
                    <Collapse in={open} timeout="auto" unmountOnExit key={`ee-${props.items.id}`}>
                        <List disablePadding dense
                              key={`ff-${props.items.id}`}>
                            {props.items.items.map((subItem, index) => (
                                <div key={`ok-${index}`}>
                                    <SidebarItem
                                        key={`${subItem.name}${index}`}
                                        depth={props.depth + 1}
                                        depthStep={props.depthStep}
                                        items={subItem}
                                        noteClicked={props.noteClicked}
                                        clicked_id={props.clicked_id}
                                        droppedHandler={props.droppedHandler}
                                        class={""}
                                        icon={true}
                                        note_id={props.note_id}
                                        clickHandle={props.clickHandle}
                                    />
                                </div>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ) : null}
        </>)
}

function NotebookHeader({text}) {

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({name: "NotebookHeader", id: 0}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;

    return (
        <div>
            <h3 className={`py-2 text-xs pl-4 text-muted_ uppercase tracking-widest font-bold  mt-4 ${isActive ? "sidebar-active" : ""}`}
                ref={drop}
                id={"notebook-header"}
                role="card"
            >{text}</h3>
        </div>
    )
}

function Sidebar(props) {

    const [openSm, setOpenSm] = useState(false);

    const clickHandle = () => {
        setOpenSm(!openSm);
    }
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div
            className={`
            sidebar 
            z-10 flex 
            flex-col 
            h-screen 
            md:w-72
            w-full
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
            <div className={`flex-shrink-0 h-14 mx-5 flex flex-row items-center justify-between `}>
                <Search clickHandle={clickHandle}/>
                <button id="theme-toggle" className="mr-8 md:mr-0" type="button">
                    <Tooltip title={"Dark theme"}>
                        <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>
                    </Tooltip>
                    <Tooltip title={"Light theme"}>
                        <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>
                    </Tooltip>
                </button>
                <Tooltip title={"Toggle menu"}>
                    <button className={`p-2 bg-secondary fixed top-2 right-2 rounded md:hidden rounded-lg focus:outline-none focus:shadow-outline`} onClick={clickHandle}>
                        {!openSm
                            ? <FaBars className={"w-6 h-6"}/>
                            : <FaTimes className={"w-6 h-6"}/>
                        }
                    </button>
                </Tooltip>
            </div>
            <nav
                className={`
                flex-grow 
                md:block 
                md:pb-0 
                md:overflow-y-auto`
                }
                // style={{height: "calc(100vh - 4rem)"}}
            >
                <div className={"p-2"}>
                    {/*<h2 className={"py-2 text-xs pl-4 text-muted uppercase tracking-widest font-bold mt-4"}>Favourites</h2>*/}

                    {/*<label htmlFor="toggle-example" className="flex items-center cursor-pointer relative mb-4">*/}
                    {/*    <input type="checkbox" id="toggle-example" className="sr-only"/>*/}
                    {/*        <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-10 rounded-full"></div>*/}
                    {/*        <span className="ml-3 text-gray-900 text-sm font-medium">Toggle me</span>*/}
                    {/*</label>*/}


                    <BookMarks bookmarks={props.bookmarks} open={props.open}/>
                    <NotebookHeader text={"Notebooks"}/>

                    <List disablePadding dense key={props.depthStep}>
                        {props.items.map((sidebarItem, index) => (
                            <SidebarItem
                                key={`${sidebarItem.name}${index}`}
                                depthStep={1}
                                depth={0}
                                noteClicked={props.noteClicked}
                                items={sidebarItem}
                                clicked_id={props.clicked_id}
                                droppedHandler={props.droppedHandler}
                                class={""}
                                icon={true}
                                note_id={props.note_id}
                                clickHandle={clickHandle}
                            />
                        ))}
                    </List>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
