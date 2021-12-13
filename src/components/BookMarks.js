import React, {useEffect, useState} from "react";
import {FaFileAlt, FaStar} from "react-icons/all";
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function BookMarks(props) {

    const [bookMarks, setBookMarks] = useState([props.bookmarks])
    const [open, setOpen] = useState(true)
    useEffect(() => {
        setBookMarks(props.bookmarks)
    }, [props.bookmarks])

    return (
        <>
            <List disablePadding dense>
                <ListItem
                    key={"head"}
                    onClick={() => setOpen(!open)}
                    className={"hover:cursor-pointer"}>
                    <ListItemText>
                        <div className={"flex items-center"}>
                            <div><FaStar className={"icon icon-accent"}/></div>
                            <div>
                                <span className={"ml-1 text-xs text-muted_ uppercase tracking-widest font-bold mt-4"}>Favourites</span>
                            </div>
                        </div>

                    </ListItemText>
                    {bookMarks.length
                    ? open ? <ExpandLess/> : <ExpandMore/>
                        : ""}
                </ListItem>
                {bookMarks.length
                ? <Collapse in={open} timeout="auto" unmountOnExit key={`collapse-bookmark`}>
                    {bookMarks.map((bookmark, index) => (
                        <ListItem key={`bookmark-${bookmark.id}`} className={"hover:cursor-pointer pl-3"}>
                            <ListItemText>
                                <div className={'flex justify-start items-center'}>
                                    <FaFileAlt className={`icon icon-muted`}/>
                                    <div className={`ml-2 text-s`}>
                                        {bookmark.label}
                                    </div>
                                </div>
                            </ListItemText>
                        </ListItem>
                    ))}
                </Collapse>
                :""}
            </List>
        </>
    )
}

export default BookMarks