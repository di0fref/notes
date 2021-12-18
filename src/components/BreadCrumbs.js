import {FaFileAlt} from "react-icons/all";
import {useEffect, useState} from "react";
import FolderService from "../service/FolderService";

function BreadCrumbs(props){

    const [breadCrumb, setBreadCrumb] = useState([])
    const [title, setTitle] = useState(props.title)

    let p = []

    const getBreadCrumbs = (data) => {
        data.forEach((el, index) => {
            p.push(el.label)
            if (el.parent) {
                getBreadCrumbs(el.parent)
            }
        })
    }
    useEffect(() => {
        FolderService.getBread(props.note.folder_id).then((result) => {
            getBreadCrumbs(result)
            setBreadCrumb(p.reverse())
        })
    },[props.title])

    return(
        <div className={"truncate w-60 md:w-full"}>
            {breadCrumb.join(" / ")} / {props.title? props.title:"Untitled"}
        </div>

    )
}
export default BreadCrumbs
