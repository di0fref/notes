import '@themesberg/flowbite';
import {Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, {useState} from "react";
import {BiLockAlt, FaRegFilePdf, HiOutlineTrash, HiShare} from "react-icons/all";
import {menuItemStyle} from "./style";
import ButtonIconSmall from "../styled/ButtonIconSmall";
import ButtonIcon from "../styled/ButtonIcon";
import {Link} from "react-router-dom";
import {button, style_folder, style_share} from "../styles";
import CloseIcon from "@mui/icons-material/Close";

function NoteMenu(props) {
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);

    const [openModal, setModelOpen] = useState(false)

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
        setModelOpen(true)
    }

    function moveToTrash() {
        props.moveToTrash()
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
            <Link to={"#"} onClick={() => setModelOpen(!openModal)}>OPEN</Link>
            <ButtonIcon
                onClick={handleClick}>
                <MoreVertIcon/>
            </ButtonIcon>
            <Menu
                // dense
                id="note-menu"
                aria-labelledby="note-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >
                {options.map((item, index) => {
                    return (
                        <MenuItem
                            key={`${index}-notemenu`}
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
            <Modal
                open={openModal}
                // onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description">
                <Box sx={style_share} className={"modal-box-shared rounded rounded-lg "}>
                    <IconButton sx={button} onClick={() => setModelOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                    <div className={""}>
                        <div className={"high rounded rounded-t-lg modal-title py-3 px-4 bg-secondary flex items-center justify-between"}>
                            <span>Share document</span>
                        </div>

                        <div className={"modal-body p-4"}>

                            <div className={"flex flex-col items-center_ justify-start"}>
                                <div className={"flex flex-col mr-4_"}>
                                    <div className={"ml-1 mb-1"}>Email address</div>
                                    <div>
                                        <input
                                            type={"text"}
                                            className={"mr-6_ px-2 py-1 w-full font-medium ml-1 rounded rounded-lg"}
                                            placeholder={"Input email address"}
                                            id={"edit-folder"}
                                            autoFocus
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className={"flex flex-col mt-4"}>
                                    <div className={"ml-1 mb-1"}>Share as</div>
                                    <div>
                                        <select className={"rounded rounded-lg py-1 w-full"} id={"share-role"}>
                                            <option></option>
                                            <option>Writer</option>
                                            <option>Reader</option>
                                            <option>No access</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={"modal-footer p-4"}>
                            <div className={"flex items-center justify-end"}>
                                <button
                                    onClick={() => {setModelOpen(false)}}
                                    className={"mr-4 shadow bg-gray-700 hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>
                                    Cancel
                                </button>
                                <button className={"shadow bg-indigo-500 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default NoteMenu
