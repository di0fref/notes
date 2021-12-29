import ThemeSwitcher from "./ThemeSwitcher";
import {FaLock, FaUser, HiLockClosed, HiMail} from "react-icons/all";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth";
import NotesService from "../service/NotesService";

function SignUp() {

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .required("Email is required"),
        password: Yup.string()
            .required('Password is required')
            .min(1, 'Password must be at least 6 characters'),
        confirmpassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, reset, formState} = useForm(formOptions);
    const {errors} = formState;

    function onSubmit(data) {
        /* Create new account */

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(result.user);
                let user_data = {
                    uid: user.uid,
                    idToken: result._tokenResponse.idToken,
                    user: {
                        uid: user.uid,
                        displayName: "",
                        email: user.email,
                        photoURL: user.photoURL
                    }
                }

                NotesService.login(user_data)
                    .then((result) => {
                        localStorage.setItem("api_token", result.data.api_token)
                        localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("uid", user.uid)
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });


    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8_ bg-secondary p-4 shadow_">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-normal">
                            Sign up
                        </h2>
                    </div>
                    <form className="mt-4" action="#" method="POST" onSubmit={e => e.preventDefault()}>
                        <div className={"mt-2 "}>
                            <div className={"relative"}>
                                <label htmlFor={""} className="sr-only">Name</label>
                                <input {...register("fullname")}
                                       id={"fullname"}
                                       name="fullname"
                                       type="text"
                                       className="pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm"
                                       placeholder="Name"/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-gray-200">
                                    <FaUser/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.fullname?.message}</span>

                            <div className={"mt-2 relative"}>
                                <label htmlFor={"email"} className="sr-only">Email</label>
                                <input {...register("email")}
                                       id={"email"}
                                       name="email"
                                       type="email"
                                       autoComplete="email"
                                       className="pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm"
                                       placeholder="Email"/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-gray-200">
                                    <HiMail/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.email?.message}</span>

                            <div className={"mt-2 relative"}>
                                <label htmlFor={"password"} className="sr-only">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    className="pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    {...register("password")}/>

                                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-gray-200">
                                    <FaLock/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.password?.message}</span>

                            <div className={"mt-2 relative"}>
                                <label htmlFor={"confirmpassword"} className="sr-only">Confirm password</label>
                                <input
                                    id={"confirmpassword"}
                                    name="confirmpassword"
                                    type="password"
                                    autoComplete="off"
                                    className="pl-10 pr-3 rounded relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 _focus:z-10 sm:text-sm"
                                    placeholder="Confirm password"
                                    {...register("confirmpassword")}/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-gray-200">
                                    <FaLock/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.confirmpassword?.message}</span>

                        </div>

                        <div>
                            <button onClick={handleSubmit(onSubmit)} type="submit" className="mt-4  mb-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <HiLockClosed/>
                              </span>
                                Create account
                            </button>
                        </div>
                    </form>

                        <div className={"flex justify-end items-center font-display font-semibold text-sm"}>
                        <span>Already have an account? <Link to={"/login"} className={"link"}>Sign in</Link></span>
                    </div>
                </div>
            </div>
            <ThemeSwitcher/>
        </>
    )
}

export default SignUp;