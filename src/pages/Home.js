import React, { useState, useEffect, createContext, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import FolderService from "../service/FolderService";
import NotesService from "../service/NotesService";
import useUrl from "../components/hooks/useUrl";
import { Router, useParams } from "react-router-dom";
import t from "../components/CustomToast";
import { GlobalContext } from "../components/contexts/GlobalContext";

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
	const { addItemToList } = useContext(GlobalContext);

	let params = useParams();

	useEffect(() => {
		(async () => {
			let response = await FolderService.getResult(0);
			let notesWithoutFolder = await FolderService.notesByFolderId(0);
			let bookmarks = await NotesService.getBookMarks();
			setBookMarks(bookmarks.data);
			setTreeData(response.concat(notesWithoutFolder.data));
			setDropped(false);
			setNoteCreated(false);
			setTitleChanged(false);
			setFolderCreated(false);
		})();
	}, [dropped, noteCreated, titleChanged, folderCreated]);

	const droppedHandler = () => {
		setDropped(true);
	};
	useUrl(
		(type, id) => {
			noteClicked(type, id);
		},
		[params]
	);

	const noteClicked = (type, id) => {
		setClickedId(id);
        // console.log("noteClicked");
		if (type === "note") {
			NotesService.get(id)
				.then((result) => {
					setNote(result.data[0]);
					setFolder(result.data[0].folder_id);
					/* Insert into recent */
					NotesService.addRecent(id)
						.then((result) => {
							// console.log("Added recent");
						})
						.catch((err) => {
							console.log(err);
						});

				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setFolder(id);
			FolderService.get(id).then((result) => {
				addItemToList(result.data[0]);
			});
		}
	};

	const createFolder = (name) => {
		FolderService.create({
			name: name,
			parent_id: folder || 0,
		})
			.then((result) => {
				setFolderCreated(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	function uuidv4() {
		return (
			Date.now().toString(36) + Math.random().toString(36).substring(2)
		);
	}

	const createNote = (e) => {
		let id = uuidv4();
		NotesService.create({
			id: id,
			name: "",
			folder_id: folder || 0,
			text: null,
		}).then((result) => {
			NotesService.get(id).then((result) => {
				setNote(result.data[0]);
				setNoteCreated(true);
				setClickedId(id);
			});
		});
	};

	const titleChange = () => {
		setTitleChanged(true);
	};

	const setBookMark = async (note) => {
		// console.log("setBookMark")
		note.bookmark = !note.bookmark;
		NotesService.setBookmark(note.id, { bookmark: note.bookmark }).then(
			(result) => {
				setBookMarked(true);
				NotesService.get(note.id)
					.then((result) => {
						setNote(result.data[0]);
						NotesService.getBookMarks().then((bookmarks) => {
							setBookMarks(bookmarks.data);
							setBookMarked(false);
						});
						note.bookmark
							? t("success", "Note added to bookmarks")
							: t("success", "Note removed from bookmarks");
					})
					.catch((err) => {
						t("error", "Something went wrong");
					});
			}
		);
	};

	return (
		<div className="md:flex flex-col md:flex-row md:min-h-screen w-full overflow-hidden">
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
			/>
			<Content
				noteClicked={noteClicked}
				note={note}
				titleChange={titleChange}
				setBookMark={setBookMark}
			/>
		</div>
	);
}

export default Home;
