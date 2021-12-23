import {HiLockClosed} from "react-icons/all";
import {useState} from "react";
import NotesService from "../service/NotesService";
import { useNavigate } from "react-router-dom";

function Login(props) {

    const [username, setUsername] = useState("fredrik@fahlstad.se")
    const [password, setPassword] = useState("test")

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()
        /* Call backend to validate user */
        NotesService.login({
                username: username,
                password: password
            }
        ).then((result) => {
            localStorage.setItem("api_token", result.data.api_token)
            console.log("localStorage")
            navigate('/')
        }).catch((err) => {

        })
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-200 p-4 shadow_">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>

                    </div>
                    <form className="mt-8 " action="#" method="POST" onSubmit={submitHandler}>
                        <div className="">
                            <div className={"mt-2"}>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                            </div>
                            <div className={"mt-2"}>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="mt-4  mb-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <HiLockClosed/>
                              </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
