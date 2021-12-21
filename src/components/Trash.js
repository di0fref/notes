import React, {useEffect, useState} from "react";
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import {
    BiLock, CgFileDocument,
    FaCaretDown,
    FaCaretRight,
    HiOutlineTrash
} from "react-icons/all";
import MyLink from "./Link";

function Trash(props) {
    const [open, setOpen] = useState(false)
    const [trash, setTrash] = useState([])

    useEffect(() => {
        setTrash(props.trash)
    }, [props.trash])

    return (
        <List key={"thead"}
              className={"hover:cursor-pointer"}>
            <ListItem
                button dense
                disableRipple disableTouchRipple
                key={"thead"}
                onClick={() => setOpen(!open)}
            >
                <ListItemText>
                    <div className={'flex justify-start items-center'}>
                        <div className={"mr-2"}>
                            {(trash.length > 0)
                                ? open
                                    ? <FaCaretDown className={"icon-caret"}/>
                                    : <FaCaretRight className={"icon-caret"}/>
                                : null}
                        </div>
                        <div>
                            <HiOutlineTrash className={`icon`}/>
                        </div>
                        <div className={`ml-2 text-s truncate`}>
                            Trash
                        </div>
                    </div>
                </ListItemText>
            </ListItem>
            {trash.length
            ?(<Collapse in={open} timeout="auto" unmountOnExit key={`collapse-trash`}>
                {trash.map((t, index) => (
                    <MyLink type={"note"} id={t.id} key={`tlink-${index}`}>

                    <ListItem key={`trash-${index}`}
                              button dense
                              disableRipple disableTouchRipple
                              className={"hover:cursor-pointer"}
                              style={
                                  {
                                      marginLeft: "1.5rem",
                                      width: "inherit",
                                      marginTop: "2px"
                                  }
                              }>
                        <ListItemText className={"pl-6_"}>
                            <div className={'flex justify-start items-center'}>
                                <CgFileDocument className={`icon icon-muted`}/>
                                <div className={`ml-2 text-sm truncate text-sm`}>
                                    {t.name}
                                </div>
                            </div>
                        </ListItemText>
                    </ListItem>
                    </MyLink>
                ))}
            </Collapse>)
                :null}
        </List>
    )
}

export default Trash
