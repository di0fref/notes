import React, {useEffect, useState} from "react";
import {CgFileDocument, FaCaretDown, FaCaretRight, FaFileAlt, FaRegStar, FaStar, HiStar} from "react-icons/all";
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import ArrowTooltips from "./Tooltip";
import moment from "moment";

function BookMarks(props) {

    const [bookMarks, setBookMarks] = useState([props.bookmarks])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setBookMarks(props.bookmarks)
        // if (props.open)
        //     setOpen(true)
    }, [props.bookmarks, props.open])
    const formatDate = (date) => {
        return moment(date).format("YYYY-M-d H:m")
    }
    return (
        <div className={"my-1"}>
            <List disablePadding dense>
                <ListItem button dense
                          selected={!open}
                        disableRipple disableTouchRipple
                        key={"head"}
                        onClick={() => setOpen(!open)}
                        className={"hover:cursor-pointer"}
                        sx={{
                        paddingLeft: "4px"
                }}>
                    <ListItemText>
                        <div className={'flex justify-start items-center'}>
                            {/*<div className={""}>*/}
                            {/*    {bookMarks.length*/}
                            {/*        ? open*/}
                            {/*            ? <FaCaretDown className={"icon-caret"}/>*/}
                            {/*            : <FaCaretRight className={"icon-caret"}/>*/}
                            {/*        : ""}*/}
                            {/*</div>*/}
                            {/*<div><FaRegStar className={"icon icon-accent ml-2"}/></div>*/}
                            <div><span className={"mt-4 ml-2"}>Favourites</span></div>
                            <div><HiStar className={"icon-accent ml-1"}/></div>
                            <div className={"text-muted text-xs ml-2"}>
                                {!open?(`(${bookMarks.length} hidden)`):""}
                            </div>
                        </div>
                    </ListItemText>
                </ListItem>
                {bookMarks.length
                    ? <Collapse in={open} timeout="auto" unmountOnExit key={`collapse-bookmark`}>
                        {bookMarks.map((bookmark, index) => (
                            <Link to={`/note/${bookmark.id}`} key={`link-${bookmark.id}`}>
                                <ArrowTooltips
                                    placement={"right"}
                                    arrow
                                    title={
                                        <div className={"text-center"}>
                                            <p>Modified at: {formatDate(bookmark.date_modified)}</p>
                                            <p>Created at: {formatDate(bookmark.date_created)}</p>
                                        </div>
                                    }>
                                    <ListItem disableRipple disableTouchRipple button dense key={`bookmark-${bookmark.id}`} className={"hover:cursor-pointer pl-3"}>
                                        <ListItemText style={{paddingLeft: "10px"}}>
                                            <div className={'flex justify-start items-center'}>
                                                <CgFileDocument className={`icon icon-muted`}/>
                                                <div className={`ml-2 text-sm truncate text-sm`}>
                                                    {bookmark.name
                                                        ? bookmark.name
                                                        : "Untitled"
                                                    }
                                                </div>
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                </ArrowTooltips>
                            </Link>
                        ))}
                    </Collapse>
                    : ""}
            </List>
        </div>
    )
}

export default BookMarks
