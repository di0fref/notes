import React, {useState} from "react";
import {
    ListItemText,
    MenuItem,
    Divider,
    Menu,
    ListItemIcon,
} from "@mui/material";
import {HiChevronDown, HiCog, HiLogout, HiQuestionMarkCircle, HiUser, HiUserCircle} from "react-icons/all";
import {menuItemStyle} from "./style";
import {Link, useNavigate} from "react-router-dom";

function UserMenu() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        localStorage.clear();
        navigate('/login')
    }
    const menuItems = [
        {
            name: "My settings",
            icon: <HiCog className={"text-normal"}/>
        },
        {
            name: "Help ",
            icon: <HiQuestionMarkCircle className={"text-normal"}/>
        },
        {
            divider: true,
            name: "Sign out ",
            icon: <HiLogout className={"text-normal"}/>,
            onClick: () => logOut()
        }
    ]
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className={"hover:shade-100 rounded"}>
            {/*<Avatar/>*/}
            <Link to={"#"} onClick={handleClick} className={""}>
                <div className={"flex items-center mb-4 p-1"}>
                    <div className="avatar w-10 h-10 mr-1">
                        <img src={user.photoURL} className="rounded-full p-1 bg-darker border-1" alt={"Avatar"}/>
                    </div>
                    <div className={""}>
                        <p className={"text-sm font-bold"}>{user.displayName}</p>
                        <p className={"text-muted text-xs"}>{user.email}</p>
                    </div>
                </div>
            </Link>
            <Menu
                dense
                id="user-menu"
                aria-labelledby="user-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: "var(--shade-50)",
                        color: "var(--text-normal)",
                        minWidth: "200px",
                    },
                }}
            >
                {menuItems.map((item, index) => {
                    return (
                        <div key={`usermenu-${index}`}>
                            {item.divider ? <Divider sx={{my: 0.5}}/> : null}
                            <MenuItem
                                onClick={item.onClick}
                                sx={menuItemStyle}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText onClick={handleClose}>
                                    <span className={"text-sm"}>{item.name}</span>
                                </ListItemText>
                            </MenuItem>
                        </div>
                    )
                })}
            </Menu>
        </div>
    );
};

export default UserMenu

