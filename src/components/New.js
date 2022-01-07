import { HiPlus} from "react-icons/all";
import {useState} from "react";


function New(props) {

    const [show, setShow] = useState(false)
    const newDocument = () => {
        props.createNote();
    }

    return (
            <button
                onMouseOver={() => setShow(true)}
                onMouseOut={() => setShow(false)}
                onClick={newDocument}
                className={"button-apply w-full h-10"}>
                <div className={"flex items-center justify-start ml-2"}>
                    <div><HiPlus className={"text-white mr-3"}/></div>
                    <div
                        className={"text-white font-medium"}>
                        New doc

                        {show
                            ?<span className={"ml-2 text-xs truncate font-normal"}>{`in ${props.folderData.name?props.folderData.name:"My documents"}`}</span>
                            :""}

                    </div>
                </div>
            </button>
    )
}

export default New
