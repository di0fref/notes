import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {createContext, useEffect, useState} from "react";
import {GlobalProvider} from "./components/contexts/GlobalContext";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "./components/login-button";

export const Context = createContext(null)

function App() {
    const {user, isAuthenticated} = useAuth0()

    const [local, setLocal] = useState(false);
    useEffect(() => {
        if(user) {
            localStorage.setItem("user", JSON.stringify(user, null, 2))
            setLocal(true);
        }
    }, [isAuthenticated])

    if (isAuthenticated && local) {
        return (
            <div className={"antialiased"}>
                <GlobalProvider>
                    <DndProvider backend={HTML5Backend} debugMode={true}>
                        <ToastContainer
                            hideProgressBar={true}
                            className={"text-s"}
                            position="bottom-right"/>
                        <Routes>
                            <Route path={"/:type/:id"} element={<Home/>}/>
                            <Route exact path={"/"} element={<Home/>}/>
                        </Routes>
                    </DndProvider>
                </GlobalProvider>
            </div>
        )
    } else {
        return <LoginButton/>
    }
}

export default App;
