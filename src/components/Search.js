import {Modal, Box, Typography, IconButton, ListItem, ListItemText, List} from "@mui/material";
import {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {button, style} from "./styles";
import {BiSearch, FaFileAlt, FaSearch, FaStar} from "react-icons/all";
import {Link} from "react-router-dom";

function SearchResults(props) {
    return (
        props.data.length ?
            (<List dense key={"tfy"}>
                {props.data.map((res) => {
                    return (
                        <Link to={`/note/${res.id}`} key={`search-result-link-${res.id}`} onClick={props.handleClose}>
                            <ListItem key={`search-result-${res.id}`} className={"hover:search-list-hover rounded rounded-lg hover:cursor-pointer"}>
                                <ListItemText key={`search-text-${res.id}`}>
                                    <div className={"text-base flex items-start justify-between flex-col"}>
                                        <div className={"flex items-center w-full"}>
                                            <div><FaFileAlt className={"text-muted"}/></div>
                                            <div className={"ml-2"}>{res.label}</div>
                                            <div className={"ml-auto"}>
                                                {res.bookmark
                                                    ? <FaStar className={"icon-accent"}/>
                                                    : ""
                                                }
                                            </div>
                                        </div>
                                        <div className={"text-muted text-sm ml-6"}>{res.folder}</div>
                                    </div>
                                </ListItemText>
                            </ListItem>
                        </Link>
                    )
                })}
            </List>)
            : (
                <div className={"w-96 mx-auto mt-24"}>
                    <BiSearch className={"text-more-muted_ w-24 h-24 opacity-10 mx-auto"}/>
                    <div className={"my-4 text-muted text-sm font-bold mx-auto text-center"}>No results found.</div>
                </div>
            )
    )
}

function Search(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchResults, setSearchResults] = useState([])
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 500);
        return () => clearTimeout(timer);
    }, [debouncedTerm])

    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term);
        } else {
            clearResults();
        }
    }, [term]);

    const onSearchSubmit = async (term) => {
        const res = await fetch(`http://localhost:4000/search/${term}`);
        const result = await res.json();
        setSearchResults(result);
        console.log(result)
    };

    const clearResults = () => setSearchResults([]);

    return (
        <>
            <input onClick={() => handleOpen(true)} placeholder={"Search"} className={"search rounded rounded-lg bg-gray-300_ w-full mr-6 px-2 py-1"}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style} className={"modal-box rounded rounded-lg"}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className={"flex justify-start items-center overflow-y-auto"}>
                            <BiSearch className={"text-muted opacity-50 h-6 w-6"}/>
                            <input
                                className={"mr-6 px-2 py-1 w-full bg-secondary-alt_ font-medium ml-1 rounded rounded-lg"}
                                placeholder={"Find anything"}
                                onChange={e => setDebouncedTerm(e.target.value)}
                                value={debouncedTerm}/>
                        </div>
                    </Typography>
                    <SearchResults data={searchResults} term={term} handleClose={handleClose}/>
                    <IconButton sx={button} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Modal>
        </>
    )


}

export default Search;