import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "./contexts/GlobalContext";
import {
    Box,
    IconButton,
    Modal,
    Tooltip,
    Typography
} from "@mui/material";
import {button, style_folder} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";

function NewFolderButton(props) {

    const [folderName, setFolderName] = useState("");
    const [openFolder, setOpenFolder] = useState(props.open);

    const handleOpenFolder = () => {
        setOpenFolder(true)
    };
    const handleCloseFolder = () => {
        setOpenFolder(false);
        setFormErrorFolder(null)
        props.setNewOpen(false)
    }

    const userInputNewFolder = () => {
        if (folderName === "") {
            // console.log("Error")
            setFormErrorFolder("Please input a folder name")
        } else {
            props.createFolder(folderName, props.folder_id);
            handleCloseFolder()
            setFolderName("")
            setFormErrorFolder(null)
        }
    }

    const [formErrorFolder, setFormErrorFolder] = useState(null)

    function FormErrorFolder(props) {

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
            {/*<Link to={"#"} onClick={() => handleOpenFolder(true)} edge="end" aria-label="New folder">*/}
            {/*    <Tooltip title={"New folder"}>*/}
            {/*        <div>*/}
            {/*            Folder*/}
            {/*        </div>*/}
            {/*    </Tooltip>*/}
            {/*</Link>*/}
            <Modal
                open={openFolder}
                onClose={handleCloseFolder}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style_folder} className={"modal-box-folder rounded rounded-lg"}>
                    <IconButton sx={button} onClick={handleCloseFolder}>
                        <CloseIcon/>
                    </IconButton>
                    <div className={"high modal-title rounded rounded-t-lg modal-title py-3 px-4 bg-secondary flex items-center justify-between"}>
                        Create new folder
                    </div>
                    <div className={"modal-body p-4"}>

                        <label htmlFor={"new-folder"} className={"ml-2 text-s sr-only"}>New folder name</label>
                        <div className={"flex justify-start items-center overflow-y-auto"}>
                            <input
                                type={"text"}
                                className={" mr-6 px-2 py-1 w-full font-medium ml-1 rounded rounded-lg"}
                                placeholder={"New folder name"}
                                id={"new-folder"}
                                autoFocus
                                autoComplete="off"
                                onChange={(e) => {
                                    setFormErrorFolder(null)
                                    setFolderName(e.target.value)
                                }}
                            />
                        </div>
                        <div className={"text-s h-4 error ml-2"}><FormErrorFolder error={formErrorFolder}/></div>
                        <div className={"flex items-center justify-end mt-6 mr-6"}>
                            <button onClick={handleCloseFolder} className={"mr-4 shadow bg-gray-700 hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Cancel</button>
                            <button
                                onClick={userInputNewFolder}
                                className={"shadow bg-indigo-500 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-s py-1 px-2 rounded"}>Create
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default NewFolderButton
