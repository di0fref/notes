import {FaFileAlt} from "react-icons/all";
import {useEffect, useState} from "react";
import FolderService from "../service/FolderService";

function BreadCrumbs(props){

    const [breadCrumb, setBreadCrumb] = useState([])
    const [titleSaved, setTitleSaved] = useState(props.titleSaved);

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
        console.log("BreadCrumbs::useEffect")
        if(props.note.id) {
            FolderService.getBread(props.note.folder_id).then((result) => {
                getBreadCrumbs(result)
                setBreadCrumb(p.reverse())
            })
        }
    },[titleSaved])

    return(
        <div className={"truncate w-60 md:w-full"}>
            {breadCrumb.join(" / ")} / {props.title? props.title:"Untitled"}
        </div>

    )
}
export default BreadCrumbs
