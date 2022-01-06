import React, {useEffect, useState} from "react";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {CgFileDocument, FaFolder} from "react-icons/all";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import FolderMenu from "./Menus/FolderMenu";

function SubList(props) {

    const [items, setItems] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    return (
        <>
            <ListItem
                disableGutters={true}
                onClick={() => setOpen(!open)}
                sx={{
                    ml: props.depth * props.depthStep + ".25rem",
                    pl:0
                }}>
                <ListItemButton>
                    <ListItemIcon>
                        {items.type === "folder" ? <FaFolder className={`text-normal`}/> :
                            <CgFileDocument className={`text-normal`}/>}
                    </ListItemIcon>
                    <ListItemText>{items.name}</ListItemText>
                    {(props.items.items && props.items.items.length > 0)
                        ? open ? <ExpandLess/> : <ExpandMore/>
                        : null}
                </ListItemButton>
                {(items.type === "folder")
                    ? (<ListItemSecondaryAction className={`secondary-action`}>
                        <FolderMenu editFolder={props.editFolder} folder={{
                            id: props.items.id,
                            name: props.items.name
                        }}/>
                    </ListItemSecondaryAction>)
                    : null}
            </ListItem>

            {items.items ? (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {items.items.map((subItem, index) => (
                        <List
                            sx={{pl:0, pr:0}}
                            // dense={true}
                            disablePadding={true}>
                            <SubList
                                items={subItem}
                                depth={props.depth + 1}
                                depthStep={props.depthStep}/>
                        </List>
                    ))}
                </Collapse>
            ) : null}
        </>
    )

}

function Side(props) {

    const [tree, setTree] = useState(props.tree)

    useEffect(() => {
        setTree(props.tree)
    }, [props.tree])

    return (
        <div>
            {tree.map((item, index) => {
                return (
                    <List
                        // dense={true}
                        disablePadding={true}
                    >
                        <SubList
                            items={item}
                            depthStep={1}
                            depth={1}/>
                    </List>
                )
            })}

        </div>
    )
}

export default Side
