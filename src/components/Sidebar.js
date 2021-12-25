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
    BiLock, HiLogout, HiCog, FaUserCircle, HiUser
} from "react-icons/all";
import '@themesberg/flowbite';


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
import Trash from "./Trash";
import {Link} from "react-router-dom";


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
                                FolderService.update(item.id, {folder_id: dropResult.id}).then((result) => {
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

    const handleClick = (type, id) => {
        setOpen(!open);
        if (type === "folder") {
            props.folderClicked(id)
        }
    };


    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    })

    const formatDate = (date) => {
        return moment(date).format("YYYY-M-D H:m")
    }

    return (
        <>
            <MyLink type={props.items.type} id={props.items.id}>
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
                    <ListItem button dense
                              id={`item-${props.items.id}`}
                              ref={attacheRef}
                              // style={{opacity}}
                              role="card"
                              onClick={() => {
                                  handleClick(props.items.type, props.items.id);
                              }}
                              style={{
                                  // paddingLeft: "4px",
                              //     // marginLeft:"1.4rem",
                              //     // width:"calc(100% - 1.4rem)"
                              }}
                              key={`bb-${props.items.id}`}
                              selected={
                                  // (props.items.id === props.note_id && props.items.type === "note")
                                  (props.items.id === props.clicked_id)

                              }
                              disableRipple disableTouchRipple
                              className={`${isActive ? "sidebar-active" : ""} pointer`}
                              style={
                                  {
                                      marginLeft: props.depth * props.depthStep + ".25rem",
                                      // // width: "inherit",
                                      marginTop: "2px",
                                      width:`calc(100% - ${props.depth * props.depthStep + ".25rem"})`,
                                      paddingLeft: "4px",
                                      paddingRight:0
                                      // // paddingLeft:0
                                  }
                              }>
                        <ListItemText
                            // style={{marginLeft: props.depth * props.depthStep*1.5+"rem"}}
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
                                    {props.items.name.length
                                        ? props.items.name
                                        : "Untitled"
                                    }
                                </div>
                                {props.items.locked
                                    ? (<span className={"ml-auto"}>
                                    <BiLock className={"text-red-500 opacity-50"}/>
                                    </span>)
                                    : null
                                }
                            </div>
                        </ListItemText>
                    </ListItem>
                </ArrowTooltips>
            </MyLink>
            {(props.items.items && props.items.items.length > 0) ? (
                <div key={`er-${props.items.id}`}>
                    <Collapse in={open} timeout="auto" unmountOnExit key={`ee-${props.items.id}`}>
                        <List disablePadding dense
                              key={`ff-${props.items.id}`}
                              // style={{
                              //     marginLeft:"2rem"
                              // }}
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
            <h3 className={`text-xs pl-4_ uppercase tracking-widest font-bold  ${isActive ? "sidebar-active" : ""}`}
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
                            {/*{context.folder.name*/}
                            {/*? <div className={"ml-2 mr-auto text-s"}>In {context.folder.name}</div>*/}
                            {/*    : ""}*/}
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
    const [topClicked, setTopClicked] = useState(true)
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
            <div className={"p-4"}>
                {/*<div className={"flex items-center justify-start py-2"}>*/}
                {/*<UserMenu/>*/}
                {/*</div>*/}
                <div className={`flex-shrink-0 h-14 mx-5_ flex flex-row items-center justify-between `}>
                    <Search clickHandle={clickHandle} text={"Search"}/>
                    <Tooltip title={"Toggle menu"}>
                        <button className={`bg-secondary fixed top-2 right-12 rounded md:hidden rounded-lg focus:outline-none focus:shadow-outline`} onClick={clickHandle}>
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
                    }>
                    <div className={"p-2_"}>
                        <div className={"flex items-center justify-around w-full mb-3"}>
                            <Tooltip title={"New note"}>
                                <button onClick={props.createNote} className={"h-8 text-sm rounded bg-accent-blue flex-grow  hover:bg-hover"}>
                                    <div className={"flex items-center justify-center"}>
                                        <span className={"mr-auto ml-2"}><FaPlus className={"font-thin"}/></span>
                                        <span className={"mr-24"}>New note</span>
                                    </div>
                                </button>
                            </Tooltip>
                        </div>
                        <BookMarks bookmarks={props.bookmarks} open={props.open}/>

                        {/*<NotebookHeader text={"Notebooks"} createFolder={props.createFolder} folder={props.clicked_id}/>*/}

                        <List disablePadding dense key={props.depthStep}>
                            <Link to={"#"}>
                                <ListItem onClick={() => setOpen(!open)}
                                          className={"text-lg"}
                                          selected={!open}
                                          button
                                          disableRipple
                                          disableTouchRipple
                                          sx={{
                                              paddingLeft: "4px"
                                          }}>
                                    <ListItemText className={""}
                                        key={`cc-${props.items.id}`}>
                                        <div className={'flex justify-start items-center'}>
                                            <div className={""}>
                                                {open
                                                    ? <FaCaretDown className={"icon-caret"}/>
                                                    : <FaCaretRight className={"icon-caret"}/>
                                                }
                                            </div>
                                            <HiUser className={`icon ml-2`}/>

                                            <div className={`ml-2 text-s ${props.class} truncate`}>
                                               My notes
                                            </div>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                            </Link>
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
                                    />
                                ))}</Collapse>
                        </List>
                        <div className={"mt-4"}>
                            <Trash trash={props.trash}/>
                        </div>
                        {/*<Avatar/>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
