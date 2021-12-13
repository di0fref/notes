import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";

function App() {

    const [theme, setTheme] = useState()
    useEffect(() => {
        // console.log("App::useEffect")
        let toggle = document.getElementById("theme-toggle");
        let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme)
        }
        setTheme(storedTheme)
        toggle.onclick = function () {
            let currentTheme = document.documentElement.getAttribute("data-theme");
            let targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }
            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('theme', targetTheme);
            // setTheme(targetTheme);
        };
    },[theme])
    return (
        <DndProvider backend={HTML5Backend} debugMode={true}>
            <ToastContainer
                hideProgressBar={true}
                className={"text-s"}/>
            <Routes>
                <Route path={"/:type/:id"} element={<Home/>}/>
                <Route exact path={"/"} element={<Home/>}/>
            </Routes>
        </DndProvider>
    );
}

export default App;
