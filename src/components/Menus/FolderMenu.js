import {
    Box,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    FaEdit,
    FaFolder,
    FaPen,
    FaTrash,
    HiFolderAdd,
    HiFolderDownload,
    HiOutlineTrash,
    HiPencil
} from "react-icons/all";
import {button, style_folder} from "../styles";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ButtonIconSmall from "../styled/ButtonIconSmall";
import {menuItemStyle} from "./style";
import NewFolderButton from "../NewFolderButton";

function FolderMenu(props) {
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [newOpen, setNewOpen] = useState(false);

    const [folderName, setFolderName] = useState(props.folder.name)
    const [folderId, setFolderId] = useState(props.folder.id)

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    };
    // const handleCloseModal = () => {
    //     setOpen(false);
    //     setFormError(null)
    // }

    const userInputEditFolder = () => {
        if (folderName === "") {
            // console.log("Error")
            setFormError("Please input a folder name")
        } else {
            props.editFolder(folderName, folderId);
            handleClose()
            handleCloseModal()
            setFormError(null)
        }
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
            <ButtonIconSmall
                onClick={handleClick}>
                <MoreVertIcon style={{
                    fontSize: "1.2em"
                }}/>
            </ButtonIconSmall>
            <Menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                // dense={true}
                id="user-menu"
                aria-labelledby="folder-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {!props.type
                    ? (
                        <MenuItem onClick={() => {
                            handleOpenModal()
                            handleClose()
                        }} sx={menuItemStyle}>
                            <ListItemIcon><HiPencil className={"text-muted"}/></ListItemIcon>
                            <ListItemText><span className={"text-sm"}>Rename</span></ListItemText>
                        </MenuItem>
                    )
                    : null}

                <MenuItem onClick={() => {
                    setNewOpen(true)
                    handleClose()
                }} sx={menuItemStyle}>
                    <ListItemIcon><HiFolderAdd className={"text-muted"}/></ListItemIcon>
                    <ListItemText><span className={"text-sm"}>New folder below</span></ListItemText>
                </MenuItem>

                {!props.type
                    ? (
                        <div>
                            <Divider/>
                            <MenuItem onClick={() => {
                                handleClose()
                            }} sx={menuItemStyle}>
                                <ListItemIcon><HiOutlineTrash className={"text-normal"}/></ListItemIcon>
                                <ListItemText><span className={"text-sm"}>Send to trash</span></ListItemText>
                            </MenuItem>
                        </div>
                    )
                    : null}
            </Menu>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style_folder} className={"modal-box-folder rounded rounded-lg"}>
                    <div className={"high modal-title rounded rounded-t-lg modal-title py-3 px-4 bg-secondary flex items-center justify-between"}>
                        Rename folder
                    </div>
                    <div className={"modal-body p-4"}>

                        {/*<label htmlFor={"new-folder"} className={"ml-2 text-s"}>Folder name</label>*/}
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
                            <button onClick={handleCloseModal} className={"button-cancel"}>Cancel</button>
                            <button
                                onClick={userInputEditFolder}
                                className={"button-apply ml-2 "}>Save
                            </button>
                        </div>
                        <IconButton sx={button} onClick={handleCloseModal}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={"modal-footer"}></div>
                </Box>
            </Modal>
            {newOpen ?
                <NewFolderButton folder_id={props.folder_id} open={newOpen} setNewOpen={setNewOpen} createFolder={props.createFolder}/> : null}
        </>
    )
}

export default FolderMenu
