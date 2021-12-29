import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {createContext, useEffect, useState} from "react";
import {GlobalProvider} from "./components/contexts/GlobalContext";
import Login from "./components/Login";

import {PrivateRoute} from "./helpers/PrivateRoute";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import SignUp from "./components/SignUp";

export const Context = createContext(null)

function App() {
    const theme = createTheme({
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
        },
    });
    return (
        <div className={"antialiased_"}>
            <ThemeProvider theme={theme}>
                <GlobalProvider>
                    <DndProvider backend={HTML5Backend} debugMode={true}>
                        <ToastContainer
                            hideProgressBar={true}
                            className={"text-s"}
                            position="bottom-right"/>
                        <Routes>
                            <Route exact path={'/'} element={<PrivateRoute/>}>
                                <Route path={"/:type/:id"} element={<Home/>}/>
                                <Route exact path={"/"} element={<Home/>}/>
                            </Route>
                            <Route exact path={"/login"} element={<Login/>}/>
                            <Route exact path={"/signup"} element={<SignUp/>}/>

                        </Routes>
                    </DndProvider>
                </GlobalProvider>
            </ThemeProvider>
        </div>
    )

}

export default App;
