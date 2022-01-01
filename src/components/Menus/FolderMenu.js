import {Box, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FaEdit, FaPen, FaTrash, HiOutlineTrash, HiPencil} from "react-icons/all";
import {button, style_folder} from "../styles";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function FolderMenu(props) {
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [folderName, setFolderName] = useState(props.folder.name)
    const [folderId, setFolderId] = useState(props.folder.id)

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        console.log(folderName)
        setOpenModal(true)
    };
    // const handleCloseModal = () => {
    //     setOpen(false);
    //     setFormError(null)
    // }

    const userInputEditFolder = () => {
        // if (folderName === "") {
        //     // console.log("Error")
        //     setFormError("Please input a folder name")
        // } else {
        //     props.createFolder(folderName);
        //     handleClose()
        //     setFolderName("")
        //     setFormError(null)
        // }
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

    return (
        <>
            <IconButton
                onClick={handleClick}>
                <MoreVertIcon className={"text-normal h-5 w-5 hover:button-hover rounded p-1"}/>
            </IconButton>
            <Menu
                dense
                id="user-menu"
                aria-labelledby="folder-button"
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
                <MenuItem onClick={() => {
                    handleOpenModal()
                    handleClose()
                }}>
                    <ListItemIcon><HiPencil className={"text-muted"}/></ListItemIcon>
                    <ListItemText><span className={"text-sm"}>Edit</span></ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                }}>
                    <ListItemIcon><HiOutlineTrash className={"text-normal"}/></ListItemIcon>
                    <ListItemText><span className={"text-sm"}>Send to trash</span></ListItemText>
                </MenuItem>
            </Menu>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style_folder} className={"modal-box-folder rounded rounded-lg"}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <label htmlFor={"new-folder"} className={"ml-2 text-s"}>Folder name</label>
                        <div className={"flex justify-start items-center overflow-y-auto"}>
                            <input
                                value={folderName}
                                type={"text"}
                                className={"mr-6 px-2 py-1 w-full font-medium ml-1 rounded rounded-lg"}
                                placeholder={"Folder name"}
                                id={"edit-folder"}
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
                            <button onClick={handleCloseModal} className={"mr-4 shadow bg-gray-700 hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Cancel</button>
                            <button
                                onClick={userInputEditFolder}
                                className={"shadow bg-accent-blue hover:bg-hover focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Save
                            </button>
                        </div>
                    </Typography>
                    <IconButton sx={button} onClick={handleCloseModal}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Modal>
        </>
    )
}

export default FolderMenu
