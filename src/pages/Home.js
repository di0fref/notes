import React, {useState, useEffect, createContext, useContext} from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import FolderService from "../service/FolderService";
import NotesService from "../service/NotesService";
import useUrl from "../components/hooks/useUrl";
import {Router, useNavigate, useParams} from "react-router-dom";
import t from "../components/CustomToast";
import {GlobalContext} from "../components/contexts/GlobalContext";

function Home() {
    const [treeData, setTreeData] = useState([]);
    const [note, setNote] = useState([]);
    const [folder, setFolder] = useState(0);
    const [clickedId, setClickedId] = useState();
    const [dropped, setDropped] = useState(false);
    const [bookMarks, setBookMarks] = useState([]);
    const [bookMarked, setBookMarked] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [titleChanged, setTitleChanged] = useState(false);
    const [folderCreated, setFolderCreated] = useState(false);
    const [locked, setLocked] = useState(false)
    const [trashed, setTrashed] = useState(false)
    const [trash, setTrash] = useState([])

    const navigator = useNavigate()
    let params = useParams();


    useEffect(() => {

        // console.log("useEffect");
        (async () => {

            let response = await FolderService.tree(0);
            setTreeData(response.data)

            let bookmarks = await NotesService.getBookMarks();
            setBookMarks(bookmarks.data);

            let trashData = await NotesService.getTrash();
            setTrash(trashData.data);

        })();
    }, [dropped, noteCreated, titleChanged, folderCreated, locked, trashed]);

    const droppedHandler = () => {
        setDropped(!dropped);
    };
    useUrl(
        (type, id) => {
            noteClicked(type, id);
        },
        [params]
    );

    useEffect(() => {
        /* Set title */
        if (note.id) {
            note.name
                ? document.title = "Noteer - " + note.name
                : document.title = "Noteer - Untitled"
        } else {
            document.title = "Noteer"
        }

    }, [note.name])

    const noteClicked = (type, id) => {
        // console.log("noteClicked::"+id)
        // console.log(type)
        setClickedId(id);
        if ((type === "note" || type === "notes") && id) {
            NotesService.get(id)
                .then((result) => {
                    setNote(result.data);
                    setFolder(result.data.folder_id);
                    /* Insert into recent */
                    NotesService.addRecent({
                        note_id: id,
                    }).then((result) => {

                    }).catch((err) => {
                        console.log(err);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };
    const moveTrash = (id) => {
        setTrashed(!trashed)
        setNote([])
    }
    const folderClicked = (id) => {
        setClickedId(id);
        setFolder(id);
    }

    const editFolder = (name, id) => {
        FolderService.update(id, {
            name: name
        }).then((result) => {
            setFolderCreated(!folderCreated)
        })
    }
    const createFolder = (name, folder_id) => {
        FolderService.create({
            name: name,
            parent_id: folder_id || 0,
        })
            .then((result) => {
                setFolderCreated(!folderCreated);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const createNote = (e) => {
        NotesService.create({
            name: "Untitled",
            folder_id: folder || 0,
            text: null,
        }).then((result) => {
            setNote(result.data);
            setNoteCreated(!noteCreated);
            setClickedId(result.data.id);
            navigator(`/notes/${result.data.id}`)
        });
    };

    const lockChanged = () => {
        setLocked(!locked)
    }
    const titleChange = () => {
        setTitleChanged(!titleChanged);
    };

    const setBookMark = async (note) => {
        note.bookmark = note.bookmark?0:1;
        NotesService.update(note.id, {bookmark: note.bookmark}).then(
            (result) => {
                setBookMarked(true);
                setNote(result.data)
                NotesService.getBookMarks().then((bookmarks) => {
                    setBookMarks(bookmarks.data);
                    setBookMarked(!bookMarked);
                    note.bookmark
                        ? t("success", "Note added to bookmarks")
                        : t("success", "Note removed from bookmarks");
                });
            }
        );
    };

    return (
        <div className="main md:flex flex-col md:flex-row md:min-h-screen w-full overflow-hidden">
            <Sidebar
                createNote={createNote}
                note_id={note.id}
                items={treeData}
                noteClicked={noteClicked}
                clicked_id={clickedId}
                droppedHandler={droppedHandler}
                titleChanged={titleChanged}
                bookmarks={bookMarks}
                open={bookMarked}
                createFolder={createFolder}
                folderClicked={folderClicked}
                trash={trash}
                editFolder={editFolder}
            />
            <Content
                noteClicked={noteClicked}
                note={note}
                titleChange={titleChange}
                setBookMark={setBookMark}
                lockChanged={lockChanged}
                moveTrash={moveTrash}
                createNote={createNote}
                tree={treeData}
            />
        </div>
    );
}

export default Home;
