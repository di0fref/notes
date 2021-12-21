import React, {useState, useEffect, createContext, useContext} from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import FolderService from "../service/FolderService";
import NotesService from "../service/NotesService";
import useUrl from "../components/hooks/useUrl";
import {Router, useParams} from "react-router-dom";
import t from "../components/CustomToast";
import {GlobalContext} from "../components/contexts/GlobalContext";
import {useWhatChanged} from "@simbathesailor/use-what-changed";

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
    const {setFolderContext, setRecentContext} = useContext(GlobalContext);
    const [locked, setLocked] = useState(false)
    const [trashed, setTrashed] = useState(false)
    const [trash, setTrash] = useState([])

    let params = useParams();

    // useWhatChanged([dropped, noteCreated, titleChanged, folderCreated, locked, trashed]);

    const context = useContext(GlobalContext)
    useEffect(() => {

        console.log("useEffect");

        (async () => {
            let response = await FolderService.getResult(0);
            // setTreeData(response);

            let notesWithoutFolder = await FolderService.notesByFolderId(0);
            setTreeData(response.concat(notesWithoutFolder.data));

            let bookmarks = await NotesService.getBookMarks();
            setBookMarks(bookmarks.data);

            let trashData = await NotesService.getTrash();
            // let recent = await NotesService.getRecent();
            // setRecentContext(recent.data)
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
        // console.log("noteClicked")
        setClickedId(id);
        if (type === "note" && id) {
            NotesService.get(id)
                .then((result) => {
                    setNote(result.data);
                    setFolder(result.data.folder_id);
                    // addRecentContext(result.data.id)

                    /* Insert into recent */
                    NotesService.addRecent({
                        id: id,
                        name: result.data.name
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
        // FolderService.get(id).then((result) => {
        //     setFolderContext(result.data[0]);
        // });
    }

    const createFolder = (name) => {
        FolderService.create({
            name: name,
            parent_id: folder || 0,
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
            name: "",
            folder_id: folder || 0,
            text: null,
        }).then((result) => {
            setNote(result.data);
            setNoteCreated(!noteCreated);
            setClickedId(result.id);
        });
    };

    const lockChanged = () => {
        setLocked(!locked)
    }
    const titleChange = () => {
        setTitleChanged(!titleChanged);
    };

    const setBookMark = async (note) => {
        // console.log("setBookMark")
        note.bookmark = !note.bookmark;
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
            />
            <Content
                noteClicked={noteClicked}
                note={note}
                titleChange={titleChange}
                setBookMark={setBookMark}
                lockChanged={lockChanged}
                moveTrash={moveTrash}
                createNote={createNote}
            />
        </div>
    );
}

export default Home;
