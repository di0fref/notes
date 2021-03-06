import Home from "./pages/Home";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {createContext, useEffect, useState} from "react";
import {GlobalProvider} from "./components/contexts/GlobalContext";
import Login from "./components/Login";

import PrivateRoute from "./helpers/PrivateRoute";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import SignUp from "./components/SignUp";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const Context = createContext(null)

function App() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUser(user)
            localStorage.setItem('expectSignIn', '1')

            // ...
        } else {
            localStorage.removeItem("api_token")
            localStorage.removeItem('expectSignIn')
            setUser(null)
        }
    });

    useEffect(() => {
    }, [user])


    const theme = createTheme({
        components: {
            MuiMenu: {
                defaultProps: {
                    // dense: true,
                    MenuListProps: {
                        disablePadding: true
                    },
                    PaperProps: {
                        style: {
                            backgroundColor: "var(--shade-50)",
                            color: "var(--text-normal)",
                            minWidth: "200px",
                        },
                    },
                }
            },
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
                            <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
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
