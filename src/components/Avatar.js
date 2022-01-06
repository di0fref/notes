
function Avatar(props) {

    let user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className={"flex items-center mb-4"}>
            <div className="avatar w-10 h-10 mr-1">
                <img src={user.photoURL} className="rounded-full p-1 bg-darker border-1" alt={"Avatar"}/>
            </div>
            <div className={""}>
                <p className={"text-sm font-medium"}>{user.displayName}</p>
                <p className={"text-muted text-xs"}>{user.email}</p>
            </div>
        </div>
    )
}

export default Avatar
