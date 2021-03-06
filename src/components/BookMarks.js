import React, {useEffect, useState} from "react";
import {CgFileDocument, HiStar} from "react-icons/all";
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import ArrowTooltips from "./Tooltip";
import moment from "moment";
import MyLink from "./MyLink";

function BookMarks(props) {

    const [bookMarks, setBookMarks] = useState([props.bookmarks])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setBookMarks(props.bookmarks)
    }, [props.bookmarks, props.open])

    const formatDate = (date) => {
        return moment(date).format("YYYY-M-d H:m")
    }
    return (
        <List
            style={{
                marginBottom: "0.5em"
            }}
            disablePadding={true}
        >
            <ListItem
                dense={true}
                // selected={true}
                key={"head"}
                onClick={() => setOpen(!open)}
                className={"hover:cursor-pointer"}
                sx={{
                    paddingLeft: "4px",
                    marginTop: "2px",
                }}>
                <ListItemText>
                    <div className={'flex justify-start items-center'}>
                        <div><span className={"mt-4 ml-2 text-s"}>Favourites</span></div>
                        <div><HiStar className={"icon-accent ml-1"}/></div>
                        <div className={"text-muted text-xs ml-2"}>
                            {!open ? (`(${bookMarks.length} hidden)`) : ""}
                        </div>
                    </div>
                </ListItemText>
            </ListItem>
            {bookMarks.length
                ? <Collapse in={open} timeout="auto" unmountOnExit key={`collapse-bookmark`}>
                    {bookMarks.map((bookmark, index) => (
                        <MyLink key={`link-${bookmark.id}`} type={"note"} id={bookmark.id}>
                            <ArrowTooltips
                                placement={"right"}
                                arrow
                                title={
                                    <div className={"text-center"}>
                                        <p>Modified at: {formatDate(bookmark.date_modified)}</p>
                                        <p>Created at: {formatDate(bookmark.date_created)}</p>
                                    </div>
                                }>
                                <ListItem

                                    button={true}
                                    dense={true}
                                    key={`bookmark-${bookmark.id}`}
                                    className={"hover:cursor-pointer pl-3"}
                                    style={{
                                        marginTop: "2px",
                                    }}>
                                    <ListItemText key={`cc-${bookmark.id}`}>
                                        <div className={'flex justify-start items-center'}>
                                            <div>
                                                <CgFileDocument className={`icon`}/>
                                            </div>
                                            <div className={`ml-2 text-s ${props.class} truncate`}>
                                                {bookmark.name
                                                    ? bookmark.name
                                                    : "Untitled"
                                                }
                                            </div>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                            </ArrowTooltips>
                        </MyLink>
                    ))}
                </Collapse>
                : ""}
        </List>
    )
}

export default BookMarks
