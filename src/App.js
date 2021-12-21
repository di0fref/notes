import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {createContext} from "react";
import {GlobalProvider} from "./components/contexts/GlobalContext";

export const Context = createContext(null)

function App() {
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
    );
}

export default App;
