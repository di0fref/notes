import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {createContext, useEffect, useState} from "react";
import {GlobalProvider} from "./components/contexts/GlobalContext";

import Login from "./components/Login";
import NotesService from "./service/NotesService";

export const Context = createContext(null)

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("u")){
            NotesService.validateUser({
                id: 1,
                token: "og9riuJyslzHrTqN0py7AMcMBKe5yx1UD0Y7u96P"
            })
                .then((result) => {
                    console.log(result)
            }).catch((err) => {
                console.log(err)
            })
        }
    },[])

    const loginHandle = () =>{
        setUserLoggedIn(true)
    }
    const logOutHandle = () =>{
        // setUserLoggedIn(false)
    }
    if (userLoggedIn) {
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
        return <Login loginHandle={loginHandle}/>
    }
}

export default App;
