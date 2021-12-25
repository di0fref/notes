import React, {useState} from "react";
import {
    ListItemText,
    MenuList,
    MenuItem,
    Divider,
    Button,
    Menu,
    ListItemIcon,
    IconButton,
    dividerClasses
} from "@mui/material";
import {HiChevronDown, HiCog, HiLogout, HiQuestionMarkCircle, HiUser, HiUserCircle} from "react-icons/all";
import {menuItemStyle} from "./style";

function UserMenu() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            icon: <HiLogout className={"text-normal"}/>
        }
    ]

    return (
        <div className={"ml-4 rounded"}>
            <IconButton
                id="user-button"
                aria-controls="user-button"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    borderRadius:"3px"
                }}>

                <div className={"text-normal flex items-center"}>
                    <HiUserCircle/>
                    <p className={"ml-2 text-sm"}>Menu</p>
                    <HiChevronDown className={"text-sm font-normal"}/>
                </div>
            </IconButton>
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
                        <div>
                            {item.divider?<Divider sx={{ my: 0.5 }}/>:null}
                        <MenuItem
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
