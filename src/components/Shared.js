import {Collapse, List, ListItem, ListItemText, MenuItem} from "@mui/material";
import {
    CgFileDocument,
    FaCaretDown,
    FaCaretRight, FiShare,
    HiInboxIn,
    HiOutlineShare,
    HiOutlineTrash,
    HiShare
} from "react-icons/all";
import React, {useState} from "react";
import MyLink from "./MyLink";


function Shared() {

    const [shared, setShared] = useState([])
    const [open, setOpen] = useState(false)

    return (

        <List
            style={{
                marginTop: "2em"
            }}
            disableRipple
            disableTouchRipple
            dense
            disablePadding
            button>
            <ListItem
                button
                disableRipple
                disableTouchRipple
                key={"thead"}
                onClick={() => setOpen(!open)}
                style={{
                    paddingLeft: "4px"
                }}>
                <ListItemText>
                    <div className={'flex justify-start items-center'}>
                        <div className={"mr-2"}>
                            {open
                                ? <FaCaretDown className={"icon-caret"}/>
                                : <FaCaretRight className={"icon-caret"}/>
                            }
                        </div>
                        <div>
                            <HiShare className={`icon`}/>
                        </div>
                        <div className={`ml-2 text-s truncate`}>
                            Shared with me
                        </div>
                    </div>
                </ListItemText>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit key={`collapse-trash`}>
                {shared.map((t, index) => (
                   <MyLink type={"note"} id={t.id} key={`tlink-${index}`}>
                        <ListItem key={`trash-${index}`}
                                  button dense
                                  disableRipple disableTouchRipple
                                  className={"hover:cursor-pointer"}
                                  style={
                                      {
                                          marginLeft: "0.7rem",
                                          width: "inherit",
                                          marginTop: "2px"
                                      }
                                  }>
                            <ListItemText className={"pl-6_"}>
                                <div className={'flex justify-start items-center'}>
                                    <CgFileDocument className={`icon icon-muted`}/>
                                    <div className={`ml-2 text-sm truncate text-sm`}>
                                        {t.name ? t.name : "Untitled"}
                                    </div>
                                </div>
                            </ListItemText>
                        </ListItem>
                    </MyLink>
                    ))}
                <ListItem
                    style={{
                        padding:0
                    }}
                >
                    <ListItemText>
                        <div className={" p-3 text-sm rounded bg-secondary-alt"}>Notes shared with you will be sent here.</div>
                    </ListItemText>
                </ListItem>
            </Collapse>
        </List>


    )
}

export default Shared
