import React, {useState, useEffect} from 'react';
import {FaBars, FaTimes} from "react-icons/fa"
import Sidebar from "../components/Sidebar"
import Content from "../components/Content"
import FolderService from "../service/FolderService";
import NotesService from "../service/NotesService";
import useUrl from "../components/hooks/useUrl";
import {Router, useParams} from "react-router-dom";

function Home() {

    const [treeData, setTreeData] = useState([]);
    const [note, setNote] = useState([])
    const [folder, setFolder] = useState()
    const [clickedId, setClickedId] = useState()
    const [mobileView, setMobileView] = useState(false)
    const [dropped, setDropped] = useState(false);
    const [bookMarks, setBookMarks] = useState([]);
    const [bookMarked, setBookMarked] = useState(false)
    const [noteCreated, setNoteCreated] = useState(false)
    let params = useParams();

    /* Modal */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        (async () => {
            let response = await FolderService.getResult(0);
            let notesWithoutFolder = await FolderService.notesByFolderId(0);
            let bookmarks = await NotesService.getBookMarks();
            setBookMarks(bookmarks.data)
            setTreeData(response.concat(notesWithoutFolder.data));
            setDropped(false);
            setBookMarked(false);
            setNoteCreated(false)
        })();

        // window.addEventListener('resize', handleResize)
        var toggle = document.getElementById("theme-toggle");

        var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme)


        toggle.onclick = function () {
            var currentTheme = document.documentElement.getAttribute("data-theme");
            var targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }

            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);
        };

    }, [dropped, bookMarked, noteCreated])

    const droppedHandler = () => {
        setDropped(true);
    }
    useUrl((type, id) => {
        noteClicked(type, id)
    }, [params])

    const noteClicked = (type, id) => {
        setClickedId(id);
        if (type === "note") {
            NotesService.get(id)
                .then((result) => {
                    setNote(result.data[0])
                    setFolder(result.data[0].folder_id)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFolder(id);
        }


    }

    const createFolder = (parent_id) => {

    }

    function uuidv4() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    const createNote = (e) => {
        let id = uuidv4()
        NotesService.create({
            id: id,
            name: "Untitled",
            folder_id: folder || 0,
            text: ""
        }).then((result) => {
            NotesService.get(id).then((result) => {
                setNote(result.data[0])
                setNoteCreated(true);
                setClickedId(id);
            })
        })
    }
    const setBookMark = (note) => {
        note.bookmark = !note.bookmark
        NotesService.update(note.id, note).then((result) => {
            NotesService.get(note.id).then((result) => {
                setNote(result.data[0])
                setBookMarked(true);
            })
        })
    }


    return (
        <div className="md:flex flex-col md:flex-row md:min-h-screen w-full overflow-hidden">
            <Sidebar
                createNote={createNote}
                note_id={note.id}
                items={treeData}
                noteClicked={noteClicked}
                clicked_id={clickedId}
                droppedHandler={droppedHandler}
                bookmarks={bookMarks}/>
            <Content
                noteClicked={noteClicked}
                note={note}
                setBookMark={setBookMark}/>
        </div>
    );
}

export default Home;
