import SimpleMdeReact from "react-simplemde-editor";
import {useState} from "react";

function Editor() {

    const [options, setOptions] = useState({
        maxHeight: "500px",
        backgroundColor: "transparent",
        background: "transparent"
    })

    return (
        <SimpleMdeReact options={options}/>
    )
}

export default Editor;