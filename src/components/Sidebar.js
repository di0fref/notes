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
    FaPlus, FaPlusCircle, FaMoon, FaSun
} from "react-icons/all";

import FolderService from "../service/FolderService";
import {ItemTypes} from "./Constants";
import {useDrop, useDrag} from "react-dnd";
import NotesService from "../service/NotesService";
import ArrowTooltips from "./Tooltip";
import MyLink from "./Link";
import BookMarks from "./BookMarks";
import Search from "./Search";
import {button, style_folder} from "./styles";
import {GlobalContext} from "./contexts/GlobalContext";

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
        // props.noteClicked(type, id)
        // if (type === "note") {
        //     props.clickHandle()
        // }
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
                                    <p>Modified at: {formatDate(props.items.date_modified)}</p>
                                    <p>Created at: {formatDate(props.items.date_created)}</p>
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
                                    {props.items.label.length
                                        ? props.items.label
                                        : "Untitled"
                                    }
                                </div>
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
                                        // noteClicked={props.noteClicked}
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

function NotebookHeader(props) {

    const context = useContext(GlobalContext);
    const [folderName, setFolderName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
        setFormError(null)
    }
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({name: "NotebookHeader", id: 0}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const userInputNewFolder = () => {
        if (folderName === "") {
            // console.log("Error")
            setFormError("Please input a folder name")
        } else {
            props.createFolder(folderName);
            handleClose()
            setFolderName("")
            setFormError(null)
        }
    }

    const [formError, setFormError] = useState(null)

    function FormError(props) {

        const [error, setError] = useState(null)

        useEffect(() => {
            setError(props.error ? props.error : null);
        }, [props.error])

        if (error) {
            return (
                <>{error}</>
            )
        }
        return (
            <></>
        )
    }

    const isActive = canDrop && isOver;
    return (
        <div className={"flex items-center mt-4 mb-2"}>
            <h3 className={`text-xs pl-4 uppercase tracking-widest font-bold  ${isActive ? "sidebar-active" : ""}`}
                ref={drop}
                id={"notebook-header"}
                role="card">
                {props.text}
            </h3>
            <Tooltip title={`New notebook`}>
                <button onClick={() => handleOpen(true)} className={"ml-auto mr-4 hover:text-hover-accent"}>
                    <FaPlusCircle className={"h-4 w-4"}/>
                </button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style_folder} className={"modal-box-folder rounded rounded-lg"}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <label htmlFor={"new-folder"} className={"ml-2 text-s"}>New folder</label>
                        <div className={"flex justify-start items-center overflow-y-auto"}>
                            <input
                                className={"mr-6 px-2 py-1 w-full font-medium ml-1 rounded rounded-lg"}
                                placeholder={"New folder name"}
                                id={"new-folder"}
                                autoFocus
                                autoComplete="off"
                                onChange={(e) => {
                                    setFormError(null)
                                    setFolderName(e.target.value)
                                }}
                            />
                        </div>
                        <div className={"text-s h-4 error ml-2"}><FormError error={formError}/></div>
                        <div className={"flex items-center justify-end mt-6 mr-6"}>
                            {/*<div className={"ml-2 mr-auto text-s"}>In {context.folder.name}</div>*/}
                            <button onClick={handleClose} className={"mr-4 shadow bg-gray-700 hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Cancel</button>
                            <button
                                onClick={userInputNewFolder}
                                className={"shadow bg-accent-blue hover:bg-hover focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Create
                            </button>
                        </div>
                    </Typography>
                    <IconButton sx={button} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Modal>
        </div>
    )
}

function Sidebar(props) {

    const [openSm, setOpenSm] = useState(false);

    const clickHandle = () => {
        setOpenSm(!openSm);
    }
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
                {/*<button id="theme-toggle" className="mr-8 md:mr-0" type="button">*/}
                {/*    <Tooltip title={"Dark theme"}>*/}
                {/*        <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>*/}
                {/*    </Tooltip>*/}
                {/*    <Tooltip title={"Light theme"}>*/}
                {/*        <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>*/}
                {/*    </Tooltip>*/}
                {/*</button>*/}
                <Tooltip title={"Toggle menu"}>
                    <button className={`p-2 bg-secondary fixed top-2 right-12 rounded md:hidden rounded-lg focus:outline-none focus:shadow-outline`} onClick={clickHandle}>
                        {!openSm
                            ? <FaBars className={"w-6 h-6"}/>
                            : <FaTimes className={"w-6 h-6"}/>
                        }
                    </button>
                </Tooltip>
            </div>
            <div
                className={`
                flex-grow 
                md:block 
                md:pb-0 
                md:overflow-y-auto`
                }
            >
                <div className={"p-2"}>
                    {/*<h2 className={"py-2 text-xs pl-4 text-muted uppercase tracking-widest font-bold mt-4"}>Favourites</h2>*/}

                    {/*<label htmlFor="toggle-example" className="flex items-center cursor-pointer relative mb-4">*/}
                    {/*    <input type="checkbox" id="toggle-example" className="sr-only"/>*/}
                    {/*        <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-10 rounded-full"></div>*/}
                    {/*        <span className="ml-3 text-gray-900 text-sm font-medium">Toggle me</span>*/}
                    {/*</label>*/}

                    <div className={"flex items-center justify-around w-full my-3"}>
                        <Tooltip title={"New note"}>
                            <button onClick={props.createNote} className={"h-8 text-sm rounded bg-accent-blue flex-grow  mx-4 hover:bg-hover"}>
                                <div className={"flex items-center justify-center"}>
                                    <span>New note</span>
                                    <span className={"ml-2"}><FaPlus/></span>
                                </div>
                            </button>
                        </Tooltip>
                    </div>
                    <BookMarks bookmarks={props.bookmarks} open={props.open}/>
                    <NotebookHeader text={"Notebooks"} createFolder={props.createFolder} folder={props.clicked_id}/>
                    {/*<button id="theme-toggle" className="mr-8 md:mr-0" type="button">*/}
                    {/*    <Tooltip title={"Dark theme"}>*/}
                    {/*        <span className="d-block-light d-none hover:text-hover-accent"><FaMoon/></span>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Tooltip title={"Light theme"}>*/}
                    {/*        <span className="d-block-dark d-none hover:text-hover-accent"><FaSun/></span>*/}
                    {/*    </Tooltip>*/}
                    {/*</button>*/}
                    <List disablePadding dense key={props.depthStep}>
                        {props.items.map((sidebarItem, index) => (
                            <SidebarItem
                                key={`${sidebarItem.name}${index}`}
                                depthStep={1}
                                depth={0}
                                // noteClicked={props.noteClicked}
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
            </div>
        </div>
    );
}

export default Sidebar;
