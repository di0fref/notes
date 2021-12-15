import React, {useEffect, useState} from "react";
import {FaCaretDown, FaCaretRight, FaFileAlt, FaStar} from "react-icons/all";
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

function BookMarks(props) {

    const [bookMarks, setBookMarks] = useState([props.bookmarks])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setBookMarks(props.bookmarks)
        // if (props.open)
        //     setOpen(true)
    }, [props.bookmarks, props.open])

    return (
        <>
            <List dense disablePadding>
                <ListItem>
                    <ListItemText className={"font-medium"}>
                        <div className={"flex items-center justify-start"}>
                            <div className={"text-xs text-muted_ uppercase tracking-widest font-bold mr-2"}>Favorites</div>
                            <div><FaStar className={"icon-accent"}/></div>
                        </div>
                    </ListItemText>
                </ListItem>
            </List>
            <List disablePadding dense>
                <ListItem button dense
                          disableRipple disableTouchRipple
                          key={"head"}
                          onClick={() => setOpen(!open)}
                          className={"hover:cursor-pointer"}>
                    <ListItemText>
                        <div className={'flex justify-start items-center'}>
                            <div className={""}>
                                {bookMarks.length
                                    ? open
                                        ? <FaCaretDown className={"icon-caret"}/>
                                        : <FaCaretRight className={"icon-caret"}/>
                                    : ""}
                            </div>
                            <div>
                                <span className={"ml-1 mt-4"}>Favourite notes</span>
                            </div>
                            {/*<div><FaStar className={"icon icon-accent ml-2"}/></div>*/}
                        </div>
                    </ListItemText>
                </ListItem>
                {bookMarks.length
                    ? <Collapse in={open} timeout="auto" unmountOnExit key={`collapse-bookmark`}>
                        {bookMarks.map((bookmark, index) => (
                            <Link to={`/note/${bookmark.id}`}>
                                <ListItem disableRipple disableTouchRipple button dense key={`bookmark-${bookmark.id}`} className={"hover:cursor-pointer pl-3"}>
                                    <ListItemText style={{paddingLeft: "10px"}}>
                                        <div className={'flex justify-start items-center'}>
                                            <FaFileAlt className={`icon icon-muted`}/>
                                            <div className={`ml-2 text-s truncate`}>
                                                {bookmark.label}
                                            </div>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                    </Collapse>
                    : ""}
            </List>
        </>
    )
}

export default BookMarks