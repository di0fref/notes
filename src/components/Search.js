import {Modal, Table, Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function Search(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>
            <input onClick={() => handleOpen(true)} placeholder={"Search"} className={"search rounded rounded-lg bg-gray-300_ w-full mr-6 px-2 py-1"}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                {/*<div className={""}>*/}
                {/*    <div className={"search-input"}>*/}
                {/*        <input placeholder={"Search for anything"}/>*/}
                {/*    </div>*/}
                {/*    <div className={"search-list"}>*/}
                {/*        <Table>*/}

                {/*        </Table>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Box sx={style} className={"modal-box"}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <input placeholder={"Search for anything"}/>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    )


}

export default Search;