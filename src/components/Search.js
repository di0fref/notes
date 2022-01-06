import {
    Modal,
    Box,
    IconButton,
    ListItem,
    ListItemText,
    List,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {button, style, style_folder} from "./styles";
import {BiSearch, CgFileDocument, FaFileAlt, FaStar} from "react-icons/all";
import {Link} from "react-router-dom";
import NotesService from "../service/NotesService";

function SearchResults(props) {

    return (

        (props.term)
            ? (props.data.length
                ? (
                    <div className={"p-4"}>
                        <List dense key={"tfy"}>
                            {props.data.map((res) => {
                                return (
                                    <Link
                                        to={`/note/${res.note_id}`}
                                        key={`search-result-link-${res.note_id}`}
                                        onClick={props.handleClose}
                                    >
                                        <ListItem
                                            key={`search-result-${res.id}`}
                                            className={
                                                "hover:search-list-hover rounded rounded-lg hover:cursor-pointer"
                                            }
                                        >
                                            <ListItemText key={`search-text-${res.note_id}`}>
                                                <div
                                                    className={
                                                        "text-base flex items-start justify-between flex-col"
                                                    }
                                                >
                                                    <div className={"flex items-center w-full"}>
                                                        <div>
                                                            <CgFileDocument
                                                                className={""}
                                                            />
                                                        </div>
                                                        <div className={"ml-2"}>
                                                            {res.name?res.name:"Untitled"}
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
                )
                : (
                    <div className={"py-2_ pl-2 shade-50_ mt-4 mx-4"}>
                        <h3 className={"text-muted_ font-medium"}>No results for {props.term}</h3>
                    </div>
                ))

            : <Recent handleClose={props.handleClose}/>
    )
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
            <div className={"py-2_ pl-2 shade-50_ mt-4 mx-4"}>
                <h3 className={"text-muted_ font-medium"}>Recent documents</h3>
            </div>
            <div className={"px-4"}>
                <List dense>
                    {recent.map((res, index) => {
                        return (
                            <Link
                                to={"/notes/"+res.note_id} key={`${index}-rec`}
                                onClick={props.handleClose}
                            >
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
                                                    <CgFileDocument
                                                        className={"text-muted_"}
                                                    />
                                                </div>
                                                <div className={"ml-2"}>
                                                    {res.note_name?res.note_name:"Untitled"}
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
        NotesService.search({term:term})
            .then((result) => {
                setSearchResults(result.data);
            })
    };

    const clearResults = () => setSearchResults([]);

    return (
        <div className={"w-full"}>
            <button
                onClick={() => handleOpen(true)}
                placeholder={"Search"}
                className={
                    "hover:pointer hover:secondary-alt search rounded rounded-lg w-full md:mr-0 px-2 py-1 text-muted_ bg-primary text-left"
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
                    <div className={"high modal-title rounded rounded-t-lg modal-title py-3 px-4 bg-secondary flex items-center justify-between"}>Search</div>
                    <div className={"flex justify-between items-center h-10 mr-4 ml-4 mt-4"}>
                        <div className={"relative flex-grow"}>
                            <label htmlFor="search" className="sr-only">Search</label>
                            <input
                                value={debouncedTerm}
                                onChange={(e) => setDebouncedTerm(e.target.value)}
                                id="search"
                                name="search"
                                type="search"
                                autoFocus
                                autoComplete="off"
                                className="bg-white pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm" placeholder="Search anything"/>
                            <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-secondary-alt">
                                <BiSearch/>
                            </div>
                        </div>
                        <div>
                            <IconButton sx={button} onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <SearchResults
                        data={searchResults}
                        term={term}
                        handleClose={handleClose}
                        clickHandle={props.clickHandle}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default Search;
