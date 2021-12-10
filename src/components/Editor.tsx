import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useCallback, useState} from 'react';
import {
    Remirror,
    ThemeProvider,
    useRemirror,
    useRemirrorContext,
    useHelpers,
    useKeymap,
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
import {FaBars, FaMoon, FaSun} from "react-icons/all";
import {Tooltip} from "@mui/material";
import Moment from "react-moment";
import moment from "moment";

export interface EditorRef {
    setContent: (content: any) => void;
}

const saveToBackend = (id: string, state: any, title: string) => {
    NotesService.update(id, {
        text: prosemirrorNodeToHtml(state.state.doc),
        name: title
    }).then((result: any) => {

    }).catch((err: any) => {
        console.log(err);
    });

}
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
    },
    {
        type: ComponentItem.ToolbarMenu,
        label: "Headings",
        items: [
            {
                type: ComponentItem.MenuGroup,
                role: "radio",
                items: [
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 1},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 2},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 3},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 4},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 5},
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: {level: 6},
                    },
                ],
            },
        ],
    },
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
    let timer = setTimeout(() => {
    }, 100);

    const changeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    return (
        <>

            <div className={"flex flex-col w-full"}>
                <Remirror
                    manager={manager}
                    initialContent={state}
                    autoRender='end'
                    // hooks={hooks}
                    onChange={
                        (parameter) => {
                            // if (props.note.id) {
                            //     clearTimeout(timer);
                            //     timer = setTimeout(() => {
                            saveToBackend(props.note.id, parameter, title)
                            setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))
                            //     }, 2000);
                            // }
                        }}
                >
                    {/*<AllStyledComponent>*/}
                    {/*    <ThemeProvider>*/}
                    {/*        <div className={"px-8 py-2 editor-toolbar shadow shadow-sm"}>*/}
                    {/*            <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar"/>*/}
                    {/*        </div>*/}
                    {/*    </ThemeProvider>*/}
                    {/*</AllStyledComponent>*/}
                    {/*<div className={"flex justify-center items-center"}>*/}
                    {/*    <div className={"editor-date text-sm text-more-muted pt-2"}>*/}
                    {/*        <Moment date={dateModified} format={"D MMMM YYYY [at] HH:mm"}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={"flex justify-center items-center"}>*/}
                    {/*    <div>*/}
                    {/*        <input*/}
                    {/*            type={"text"}*/}
                    {/*            className={"text-center font-bold note-title pt-4"}*/}
                    {/*            placeholder={"Give me a title"}*/}
                    {/*            onChange={(e) => {*/}
                    {/*                changeTitle(e);*/}
                    {/*            }}*/}
                    {/*            value={title}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={"toolbar h-10"}>Toolbar</div>*/}
                    {/*<div className={"datebar h-10"}>Date</div>*/}
                    {/*<div className={"editor-part h-full"}>*/}
                        <ImperativeHandle ref={editorRef}/>
                    {/*</div>*/}

                </Remirror>

            </div>
        </>
    );
};

export default Editor;
