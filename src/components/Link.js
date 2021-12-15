import {Link} from "react-router-dom";
function MyLink(props) {
    if(props.type==="note"){
        return(
            <Link to={`/${props.type}/${props.id}`} style={props.style}>
                {props.children}
            </Link>
        )
    }
    else {
        return (
            <>
                {props.children}
            </>
        )
    }
}

export default MyLink