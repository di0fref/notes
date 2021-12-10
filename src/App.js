import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <DndProvider backend={HTML5Backend} debugMode={true}>
            <Routes>
                <Route path={"/:type/:id"} element={<Home/>}/>
                <Route exact path={"/"} element={<Home/>}/>
            </Routes>
        </DndProvider>
    );
}

export default App;
