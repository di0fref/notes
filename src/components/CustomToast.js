import {toast} from "react-toastify";

const t = (type, msg) => {
    switch (type) {
        case "success":
            toast.success(msg, {
                theme: localStorage.getItem("theme"),
                className: "noprint"
            })
            break;
        case "error":
            toast.error(msg, {
                theme: localStorage.getItem("theme"),
                className: "noprint"
            })
            break;
    }
}

export default t