
function Avatar(props) {
    return (
        <div className={"flex sidebar-avatar mx-4 pt-2 mb-10 absolute bottom-0 items-center"}>
            <div className="avatar w-12 h-12 mr-1">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Avatar" className="rounded-full p-1 bg-darker border-1"/>
            </div>
            <div className={"mr-44"}>
                <p>Fredrik Fahlstad</p>
                <p className="text-muted text-sm">Senior Developer</p>
            </div>
        </div>
    )
}

export default Avatar
