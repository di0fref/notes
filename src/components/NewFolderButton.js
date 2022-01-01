import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "./contexts/GlobalContext";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./Constants";
import {
    Box,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    Tooltip,
    Typography
} from "@mui/material";
import {FaAccessibleIcon, FaPlus} from "react-icons/all";
import {button, style_folder} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import {menuItemStyle} from "./Menus/style";

function NewFolderButton(props) {

    const context = useContext(GlobalContext);
    const [folderName, setFolderName] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
        setFormError(null)
    }

    const userInputNewFolder = () => {
        if (folderName === "") {
            // console.log("Error")
            setFormError("Please input a folder name")
        } else {
            props.createFolder(folderName);
            handleClose()
            setFolderName("")
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
            <IconButton onClick={() => handleOpen(true)} edge="end" aria-label="New folder">
                <Tooltip title={"New folder"}>
                    <div>
                        <FaPlus className={"bg-accent p-1 bg-accent-blue rounded"}/>
                    </div>
                </Tooltip>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style_folder} className={"modal-box-folder rounded rounded-lg"}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <label htmlFor={"new-folder"} className={"ml-2 text-s"}>New folder</label>
                        <div className={"flex justify-start items-center overflow-y-auto"}>
                            <input
                                type={"text"}
                                className={"mr-6 px-2 py-1 w-full font-medium ml-1 rounded rounded-lg"}
                                placeholder={"New folder name"}
                                id={"new-folder"}
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
                            <button onClick={handleClose} className={"mr-4 shadow bg-gray-700 hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Cancel</button>
                            <button
                                onClick={userInputNewFolder}
                                className={"shadow bg-accent-blue hover:bg-hover focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Create
                            </button>
                        </div>
                    </Typography>
                    <IconButton sx={button} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Modal>
        </>
    )
}

export default NewFolderButton
