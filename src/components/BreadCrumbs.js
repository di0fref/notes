import {FaFileAlt} from "react-icons/all";
import {useEffect, useState} from "react";
import FolderService from "../service/FolderService";

function BreadCrumbs(props){

    const [breadCrumb, setBreadCrumb] = useState([])

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
        console.log(breadCrumb)
        FolderService.getBread(props.note.folder_id).then((result) => {
            getBreadCrumbs(result)
            setBreadCrumb(p.reverse())
        })
    },[props.note.id])
    return(
        // {breadCrumb.reverse().join(" / ")} <FaFileAlt/> / {props.note.label}
        // <div className={"flex"}>
        //     props.breadcrumbs.join(" / ")
        <>
            {breadCrumb.join(" / ")} / {props.note.label}
        </>

    )
}
export default BreadCrumbs