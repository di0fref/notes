import {toast} from "react-toastify";

let options = {
    theme: localStorage.getItem("theme")
}
const t = (type, msg) => {
    switch (type) {
        case "success":
            toast.success(msg, {
                theme: localStorage.getItem("theme")
            })
            break;
        case "error":
            toast.error(msg, {
                theme: localStorage.getItem("theme")
            })
            break;
    }
}


export default t