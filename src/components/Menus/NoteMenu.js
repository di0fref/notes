import '@themesberg/flowbite';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, {useState} from "react";
import {BiLockAlt, FaRegFilePdf, HiOutlineTrash, HiShare} from "react-icons/all";
import {menuItemStyle} from "./style";

function NoteMenu(props) {
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function downloadPDF() {
        props.downloadPDF()
    }

    function lockForEditing() {
        props.lockForEditing()
    }

    function shareNote() {

    }

    function moveToTrash() {
        props.motoTrash()
    }

    const options =
        [
            {
                label: "Download PDF",
                icon: <FaRegFilePdf className={"text-normal"}/>,
                onClick: () => downloadPDF()
            },
            {
                label: props.locked ? "Unlock editing" : "Lock for editing",
                icon: <BiLockAlt className={"text-normal"}/>,
                onClick: () => lockForEditing()
            },
            {
                label: "Share note",
                icon: <HiShare className={"text-normal"}/>,
                onClick: () => shareNote()
            },
            {
                // divider: true,
                label: "Send to trash",
                icon: <HiOutlineTrash className={"text-normal"}/>,
                onClick: () => moveToTrash()
            },
        ]

    return (
        <>
            <IconButton
                onClick={handleClick}>
                <MoreVertIcon className={"text-normal h-6 w-6 hover:button-hover rounded p-1"}/>
            </IconButton>
            <Menu
                dense
                id="note-menu"
                aria-labelledby="note-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: "var(--shade-50)",
                        color: "var(--text-normal)",
                        minWidth: "200px",
                    },
                }}>
                {options.map((item, index) => {
                    return (
                        <MenuItem
                            onClick={item.onClick}
                            sx={menuItemStyle}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText onClick={handleClose}>
                                <span className={"text-sm"}>{item.label}</span>
                            </ListItemText>
                        </MenuItem>
                    )
                })}

            </Menu>
        </>
    )
}

export default NoteMenu
