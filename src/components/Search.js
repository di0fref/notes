import {
    Modal,
    Box,
    Typography,
    IconButton,
    ListItem,
    ListItemText,
    List,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {button, style} from "./styles";
import {BiSearch, FaFileAlt, FaStar} from "react-icons/all";
import {Link} from "react-router-dom";
import {GlobalContext} from "./contexts/GlobalContext";
import NotesService from "../service/NotesService";
import api_config from "../service/config";
function SearchResults(props) {
    return props.data.length ? (
        <div className={"p-4"}>
            <List dense key={"tfy"}>
                {props.data.map((res) => {
                    return (
                        <Link
                            to={`/note/${res.id}`}
                            key={`search-result-link-${res.id}`}
                            onClick={props.handleClose}
                        >
                            <ListItem
                                key={`search-result-${res.id}`}
                                className={
                                    "hover:search-list-hover rounded rounded-lg hover:cursor-pointer"
                                }
                            >
                                <ListItemText key={`search-text-${res.id}`}>
                                    <div
                                        className={
                                            "text-base flex items-start justify-between flex-col"
                                        }
                                    >
                                        <div className={"flex items-center w-full"}>
                                            <div>
                                                <FaFileAlt
                                                    className={"text-muted"}
                                                />
                                            </div>
                                            <div className={"ml-2"}>
                                                {res.label}
                                            </div>
                                            <div className={"ml-auto"}>
                                                {res.bookmark ? (
                                                    <FaStar
                                                        className={"icon-accent"}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className={"text-muted text-sm ml-6"}>
                                            {res.folder}
                                        </div>
                                    </div>
                                </ListItemText>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </div>
    ) : (
        <Recent/>
    );
}

function Recent(props) {

    const [recent, setRecent] = useState([]);

    useEffect(() => {
        NotesService.getRecent().then((result) => {
            setRecent(result.data)
        })
    }, [])

    return (
        <div className={""}>
            <div className={"py-2 pl-8 shade-50 mt-4"}>
                <h3 className={"text-sm text-muted font-medium"}>Recent notes</h3>
            </div>
            <div className={"p-4"}>
                <List dense>
                    {recent.map((res, index) => {
                        return (
                            <Link to={"#"}>
                                <ListItem
                                    className={
                                        "hover:search-list-hover rounded rounded-lg hover:cursor-pointer"
                                    }>
                                    <ListItemText>
                                        <div
                                            className={
                                                "text-base flex items-start justify-between flex-col"
                                            }
                                        >
                                            <div className={"flex items-center w-full"}>
                                                <div>
                                                    <FaFileAlt
                                                        className={"text-muted"}
                                                    />
                                                </div>
                                                <div className={"ml-2"}>
                                                    {res.name}
                                                </div>
                                                <div className={"ml-auto"}>
                                                    {res.bookmark ? (
                                                        <FaStar
                                                            className={"icon-accent"}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            <div className={"text-muted text-sm ml-6"}>
                                                {res.folder}
                                            </div>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}

function Search(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.clickHandle();
    };
    const [searchResults, setSearchResults] = useState([]);
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 500);
        return () => clearTimeout(timer);
    }, [debouncedTerm]);

    useEffect(() => {
        if (term !== "") {
            onSearchSubmit(term);
        } else {
            clearResults();
        }
    }, [term]);

    const onSearchSubmit = async (term) => {
        const res = await fetch(`${api_config.url}/search/${term}`,{
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${api_config.token}`
            }
        });
        const result = await res.json();
        setSearchResults(result);
    };

    const clearResults = () => setSearchResults([]);

    return (
        <div className={"w-full"}>
            <button
                onClick={() => handleOpen(true)}
                placeholder={"Search"}
                className={
                    "hover:pointer search rounded rounded-lg w-full md:mr-0 px-2 py-1 text-muted_ bg-primary text-left"
                }
            >
                <div className={"flex items-center"}>
                    <div>
                        <BiSearch className={"mr-1"}/>
                    </div>
                    <div className={"text-sm_ "}>
                        <Link to={"#"} className={"hover:text-hover-accent"}>{props.text}</Link>
                    </div>
                </div>
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={"modal-box rounded rounded-lg"}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        <div
                            className={
                                "flex justify-start items-center overflow-y-auto m-4"
                            }
                        >
                            <BiSearch
                                className={"text-muted opacity-50 h-6 w-6"}
                            />
                            <input
                                autoComplete="off"
                                type={"search"}
                                className={
                                    "mr-6 px-2 py-1 w-full font-medium ml-1 rounded"
                                }
                                placeholder={"Find anything"}
                                onChange={(e) =>
                                    setDebouncedTerm(e.target.value)
                                }
                                value={debouncedTerm}
                                id={"search-input"}
                                autoFocus
                            />
                        </div>
                    </Typography>
                    <SearchResults
                        data={searchResults}
                        term={term}
                        handleClose={handleClose}
                        clickHandle={props.clickHandle}
                    />
                    {/*<Recent searchResults={searchResults}/>*/}
                    <IconButton sx={button} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Modal>
        </div>
    );
}

export default Search;
