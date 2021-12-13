import React, {useEffect, useState} from 'react'
import {List, ListItem, ListItemText, Collapse, ListItemIcon, Box, Typography, Modal, Tooltip} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {
    FaBars,
    FaChevronLeft,
    FaFile,
    FaFileAlt, FaFolder,
    FaRegFolder,
    FaRegFolderOpen,
    FaStar, FaTimes,
    FaTrash,
    FaTrashAlt,
    FaMoon, FaSun
} from "react-icons/all";

import FolderService from "../service/FolderService";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./Constants";
import {useDrop} from "react-dnd";
import NotesService from "../service/NotesService";
import ArrowTooltips from "./Tooltip";
import MyLink from "./Link";
import BookMarks from "./BookMarks";

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
                              className={`${isActive ? "sidebar-active" : ""} pointer`}
                    >

                        <ListItemText style={{paddingLeft: props.depth * props.depthStep * 1}} key={`cc-${props.items.id}`}>
                            <div className={'flex justify-start items-center'}>

                                {(props.icon === true)
                                    ?
                                    (props.items.type == "folder")
                                        ? <FaRegFolder className={`icon text-muted`}/>
                                        : <FaFileAlt className={`icon`}/>
                                    : null}

                                <div className={`ml-2 text-s ${props.class}`}>
                                    {props.items.label}
                                </div>
                                {/*<div className={"ml-auto"}>*/}
                                {/*    {props.items.bookmark*/}
                                {/*        ? <FaStar className={"icon-accent w-2 h-2"}/>*/}
                                {/*        : null}*/}
                                {/*</div>*/}
                            </div>
                        </ListItemText>
                        {(props.items.items && props.items.items.length > 0)
                            ? open ? <ExpandLess/> : <ExpandMore/>
                            : null}
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

    return (
        <div className={`sidebar z-10 flex flex-col w-full md:w-72 flex-shrink-0 absolute md:static`}>
            <div className={`flex-shrink-0 h-14 mx-5 flex flex-row items-center justify-between `}>
                <input placeholder={"Search"} className={"search rounded rounded-lg bg-gray-300_ w-full mr-6 px-2 py-1"}/>
                <button id="theme-toggle" className="" type="button">
                    <Tooltip title={"Dark theme"}>
                        <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>
                    </Tooltip>
                    <Tooltip title={"Light theme"}>
                        <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>
                    </Tooltip>
                </button>
                <button className={`rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline`} onClick={clickHandle}>
                    {!openSm
                        ? <FaBars className={""}/>
                        : <FaTimes className={""}/>
                    }
                </button>
            </div>
            <nav
                className={`
                ease-in-out 
                transition-all 
                transform 
                duration-500 
                flex-grow 
                md:block 
                md:pb-0 
                md:overflow-y-auto  
                ${openSm ? " sidebar-open overflow-y-auto_" : "h-0 overflow-hidden "}`
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


                    <BookMarks bookmarks={props.bookmarks}/>
                    <NotebookHeader text={"Notebooks"}/>

                    <List disablePadding dense key={props.depthStep}>
                        {props.items.map((sidebarItem, index) => (
                            <SidebarItem
                                key={`${sidebarItem.name}${index}`}
                                depthStep={10}
                                depth={0}
                                noteClicked={props.noteClicked}
                                items={sidebarItem}
                                clicked_id={props.clicked_id}
                                droppedHandler={props.droppedHandler}
                                class={""}
                                icon={true}
                                note_id={props.note_id}
                            />
                        ))}
                    </List>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
