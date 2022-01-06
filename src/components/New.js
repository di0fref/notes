import { HiPlus} from "react-icons/all";


function New(props) {

    const newDocument = () => {
        props.createNote();
    }

    return (
            <button
                onClick={newDocument}
                className={"h-10 text-sm rounded  w-full text-white bg-indigo-600 hover:bg-indigo-700"}>
                <div className={"flex items-center justify-center"}>
                    <div><HiPlus className={"text-white"}/></div>
                    <div className={"text-white font-medium"}>New document</div>
                </div>
            </button>
    )
}

export default New
