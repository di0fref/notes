import {useEffect} from "react"
import {useParams} from "react-router-dom";

const useUrl = callback => {
    let params = useParams()
    useEffect(() => {
        if (params) {
            callback(params.type, params.id);
        }
    }, [params])

}

export default useUrl
