import {FaLock, FaUser, FcGoogle, HiLockClosed, HiMail} from "react-icons/all";
import {useState} from "react";
import NotesService from "../service/NotesService";
import {Link, useNavigate} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import app from "../firebase"

function Login(props) {

    const [username, setUsername] = useState("fredrik.fahlstad@gmail.com")
    const [password, setPassword] = useState("Sk84ever32!")

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                console.log("signInWithEmailAndPassword")
                // Signed in
                const user = userCredential.user;
                console.log(userCredential)
                // NotesService.login({
                //     idToken: credential.idToken,
                //     user: user,
                //     provider: credential.providerId
                // }).then((result) => {
                //     localStorage.setItem("api_token", result.data.api_token)
                //     navigate('/')
                // })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    const google = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                console.log(credential);

                /* Validate user */
                NotesService.login({
                    idToken: credential.idToken,
                    user: user,
                    provider: credential.providerId,
                    credential: credential
                }).then((result) => {
                    localStorage.setItem("api_token", result.data.api_token)
                    navigate('/')
                })
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8_ bg-secondary p-4 shadow_">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-normal">
                            Sign in to your account
                        </h2>
                    </div>
                    <Link to={"#"} onClick={google} className={""}>
                        <div className={"flex items-center h-10 mt-6 rounded "} id={"google-login"}>
                            <div className={"ml-4"}><FcGoogle/></div>
                            <div className={"ml-2"}>Sign in wth Google</div>
                        </div>
                    </Link>
                    <div className={"flex items-center justify-center mt-3"}>
                        <div className={"uppercase text-muted text-xs"}>Or</div>
                    </div>
                    <form className="mt-4" action="#" method="POST" onSubmit={submitHandler}>

                        <div className="">
                            <div className={"mt-2 relative"}>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm" placeholder="Email"/>
                                <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none  bg-secondary-alt">
                                    <HiMail/>
                                </div>
                            </div>


                            <div className={"mt-2 relative"}>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    className="pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm" placeholder="Password"/>
                                <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-secondary-alt">
                                    <FaLock/>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="mt-4  mb-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="m-px rounded absolute left-0 inset-y-0 flex items-center pl-3">
                                  <HiLockClosed/>
                              </span>
                                Sign in
                            </button>
                        </div>


                    </form>
                    <div className={"flex justify-end items-center font-display font-semibold text-sm"}>
                        <span>Don't have an account? <Link to={"/signup"} className={"link"}>Sign up</Link></span>
                    </div>
                </div>
            </div>
            <ThemeSwitcher/>
        </>
    )
}

export default Login;
