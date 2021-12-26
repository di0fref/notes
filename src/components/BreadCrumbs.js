import {FaFileAlt, HiChevronRight, HiHome, HiUser} from "react-icons/all";
import {useEffect, useState} from "react";
import FolderService from "../service/FolderService";

function BreadCrumbs(props) {

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
        if (props.note.id) {
            FolderService.getBread(props.note.folder_id).then((result) => {
                getBreadCrumbs(result)
                setBreadCrumb(p.reverse())
            })
        }
    }, [titleSaved])

    return (
        <div className={"ml-4 text-muted md:w-full "}>
            {/*{breadCrumb.join(" / ")} / {props.title? props.title:"Untitled"}*/}

            <div className={"flex text-sm"}>
                <div className={"flex items-center"}>
                    <span><HiUser className={"mr-2"}/></span>
                    <span>My notes</span>
                </div>
                {breadCrumb.map((item, index) => (
                    <div className={"flex items-center"}>
                        <span className={"mx-2"}><HiChevronRight/></span>
                        <span>{item}</span>
                    </div>
                ))}
                <div className={"flex items-center"}>
                    <span className={"mx-2"}><HiChevronRight/></span>
                    <span>{props.title ? props.title : "Untitled"}</span>
                </div>
            </div>

            {/*<nav className="flex" aria-label="Breadcrumb">*/}
            {/*    <ol className={"inline-flex items-center space-x-1 md:space-x-3"}>*/}
            {/*        <li className={"inline-flex items-center"}>*/}
            {/*            <span className={"inline-flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}>*/}
            {/*                <span><HiHome/></span>*/}
            {/*                    <span> My Notes</span>*/}
            {/*                </span>*/}
            {/*        </li>*/}
            {/*        {breadCrumb.map((item, index) => (*/}
            {/*            <li>*/}
            {/*                <div className="flex items-center">*/}
            {/*                    <span><HiChevronRight/></span>*/}
            {/*                    <span className={"ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500"}>{item}</span>*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*        <li>*/}
            {/*            <div className="flex items-center">*/}
            {/*                <span><HiChevronRight/></span>*/}
            {/*                <span className={"ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500"}>{props.title ? props.title : "Untitled"}</span>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    </ol>*/}
            {/*</nav>*/}

        </div>

    )
}

export default BreadCrumbs
