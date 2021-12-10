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
        // if (props.note.id) {
        //     editorRef.current!.setContent(props.note.text)
        //     setTitle(props.note.name)
        // }

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

            <div className={"ed-wrapper w-full h-full bg-blue-800 flex flex-col justify-start items-center"}>
                <div className={"h-10"}>Toolbar</div>
                <div className={"ed px-32  h-96 overflow-y-scroll"}>
                    What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

5
	paragraphs
	words
	bytes
	lists
	Start with 'Lorem
ipsum dolor sit amet...'
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

5
	paragraphs
	words
	bytes
	lists
	Start with 'Lorem
ipsum dolor sit amet...'
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

5
	paragraphs
	words
	bytes
	lists
	Start with 'Lorem
ipsum dolor sit amet...'

                </div>
            </div>

            {/*<div className={"prose"}>*/}
            {/*    <Remirror*/}
            {/*        manager={manager}*/}
            {/*        initialContent={state}*/}
            {/*        autoRender='end'*/}
            {/*        // hooks={hooks}*/}
            {/*        onChange={*/}
            {/*            (parameter) => {*/}
            {/*                // if (props.note.id) {*/}
            {/*                //     clearTimeout(timer);*/}
            {/*                //     timer = setTimeout(() => {*/}
            {/*                saveToBackend(props.note.id, parameter, title)*/}
            {/*                setDateModified(moment().format("YYYY-MM-DD HH:mm:ss"))*/}
            {/*                //     }, 2000);*/}
            {/*                // }*/}
            {/*            }}*/}
            {/*    >*/}
            {/*        /!*<AllStyledComponent>*!/*/}
            {/*        /!*    <ThemeProvider>*!/*/}
            {/*        /!*        <div className={"px-8 py-2 editor-toolbar shadow shadow-sm"}>*!/*/}
            {/*        /!*            <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar"/>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*    </ThemeProvider>*!/*/}
            {/*        /!*</AllStyledComponent>*!/*/}
            {/*        /!*<div className={"flex justify-center items-center"}>*!/*/}
            {/*        /!*    <div className={"editor-date text-sm text-more-muted pt-2"}>*!/*/}
            {/*        /!*        <Moment date={dateModified} format={"D MMMM YYYY [at] HH:mm"}/>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*        /!*<div className={"flex justify-center items-center"}>*!/*/}
            {/*        /!*    <div>*!/*/}
            {/*        /!*        <input*!/*/}
            {/*        /!*            type={"text"}*!/*/}
            {/*        /!*            className={"text-center font-bold note-title pt-4"}*!/*/}
            {/*        /!*            placeholder={"Give me a title"}*!/*/}
            {/*        /!*            onChange={(e) => {*!/*/}
            {/*        /!*                changeTitle(e);*!/*/}
            {/*        /!*            }}*!/*/}
            {/*        /!*            value={title}*!/*/}
            {/*        /!*        />*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*        /!*<div className={"toolbar h-10"}>Toolbar</div>*!/*/}
            {/*        /!*<div className={"datebar h-10"}>Date</div>*!/*/}
            {/*        /!*<div className={"editor-part h-full"}>*!/*/}
            {/*            <ImperativeHandle ref={editorRef}/>*/}
            {/*        /!*</div>*!/*/}

            {/*    </Remirror>*/}

            {/*</div>*/}
        </>
    );
};

export default Editor;
