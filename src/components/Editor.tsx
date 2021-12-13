import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useCallback, useState} from 'react';
import {
    Remirror,
    ThemeProvider,
    useRemirror,
    useRemirrorContext,
    ComponentItem,
    Toolbar
} from '@remirror/react';
import {
    BoldExtension,
    ItalicExtension,
    BulletListExtension,
    OrderedListExtension,
    UnderlineExtension,
    HeadingExtension
} from 'remirror/extensions';
import NotesService from "../service/NotesService";
import {prosemirrorNodeToHtml} from 'remirror';
import {AllStyledComponent} from "@remirror/styles/emotion";
import type {ToolbarItemUnion} from "@remirror/react";
import {FaStar} from "react-icons/all";
import {toast} from 'react-toastify';

import moment from "moment";

export interface EditorRef {
    setContent: (content: any) => void;
}

// const saveToBackend = (id: string, state: any, title: string) => {
//     NotesService.update(id, {
//         text: prosemirrorNodeToHtml(state.state.doc),
//         name: title
//     }).then((result: any) => {
//
//     }).catch((err: any) => {
//         console.log(err);
//     });
// }
const toolbarItems: ToolbarItemUnion[] = [
    {
        type: ComponentItem.ToolbarGroup,
        label: "History",
        items: [
            {type: ComponentItem.ToolbarCommandButton, commandName: "undo", display: "icon"},
            {type: ComponentItem.ToolbarCommandButton, commandName: "redo", display: "icon"},
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "Simple Formatting",
        items: [
            {type: ComponentItem.ToolbarCommandButton, commandName: "toggleBold", display: "icon"},
            {type: ComponentItem.ToolbarCommandButton, commandName: "toggleItalic", display: "icon"},
            {type: ComponentItem.ToolbarCommandButton, commandName: "toggleUnderline", display: "icon"},
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "Heading Formatting",
        items: [
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: {level: 1},
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: {level: 2},
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: {level: 3},
            },
        ],
        separator: "none",
    }
];
// const hooks = [
//     () => {
//         const {getJSON} = useHelpers();
//         const onSave = useCallback(
//             (props) => {
//                 const {state} = props;
//                 saveToBackend(JSON.stringify(getJSON(state)));
//                 // console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);
//
//                 return true;
//             },
//             [getJSON],
//         );
//
//         // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
//         useKeymap('Mod-s', onSave);
//     }
// ];
const ImperativeHandle = forwardRef((_: unknown, ref: Ref<EditorRef>) => {
    const {setContent} = useRemirrorContext({
        autoUpdate: true,
    });

    // Expose content handling to outside
    useImperativeHandle(ref, () => ({setContent}));

    return <></>;
});
const Editor = (props: any): JSX.Element => {
    const [dateModified, setDateModified] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        if (props.note.id) {
            editorRef.current!.setContent(props.note.text)
            setTitle(props.note.name)
        }
    }, [props.note])

    const editorRef = useRef<EditorRef | null>(null);
    const {manager, state, setState} = useRemirror({
        extensions: () => [
            new HeadingExtension(),
            new BoldExtension({}),
            new ItalicExtension(),
            new UnderlineExtension(),
            new OrderedListExtension(),
            new BulletListExtension()
        ],
        content: '',
        stringHandler: 'html',
    });

    const saveToBackend = (parameter:any) => {
        NotesService.update(props.note.id, {
            text: prosemirrorNodeToHtml(parameter.state.doc),
            name: title
        }).then((result: any) => {
            props.titleChange();
            toast.success("Note saved")
        }).catch((err: any) => {
            toast.error("Could not save note")
            console.log(err);
        });
    }

    let timer = setTimeout(() => {
    }, 100);

    const changeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    return (
        <>
            <div className={"overflow-y-auto ed-wrapper w-full flex flex-col justify-start items-center"}>
                <div className={"ed prose"}>
                    <div className={"ed-inner mx-auto mt-16"}>
                        <input value={title} onChange={changeTitle} placeholder={"Give your note a title"} className={"text-normal text-center w-full font-bold text-4xl mb-4 mt-12 md:my-4"}/>
                        <Remirror
                            classNames={["overflow-y-auto", "p-1", "editor"]}
                            manager={manager}
                            initialContent={state}
                            // state={state}
                            autoRender='end'
                            // hooks={hooks}
                            onChange={
                                (parameter) => {
                                    if (parameter.tr?.docChanged) {
                                            clearTimeout(timer);
                                            timer = setTimeout(() => {
                                                saveToBackend(parameter)
                                                setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
                                            }, 2000);
                                    }
                                }}
                        >
                            <div className={"fixed w-full h-14 top-0 tool left-72 flex items-center justify-start"}>
                                <div className={"ml-3"}>
                                    <button className={"flex items-center justify-between "}
                                            onClick={() => props.setBookMark(props.note)}>
                                        {props.note.bookmark
                                            ? <FaStar className={"icon icon-accent"}/>
                                            : <FaStar className={"icon text-normal"}/>
                                        }
                                        <span className={"ml-2 text-normal hover:text-hover"}>Bookmark</span>
                                    </button>
                                </div>
                                <div>
                                    <AllStyledComponent>
                                        <ThemeProvider>
                                            <div className={" tool-buttons flex-grow ml-12"}>
                                                <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar"/>
                                            </div>
                                        </ThemeProvider>
                                    </AllStyledComponent>
                                </div>
                                <div></div>
                            </div>
                            <ImperativeHandle ref={editorRef}/>
                        </Remirror>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Editor;
