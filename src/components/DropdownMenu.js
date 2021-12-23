import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useEffect, useState} from "react";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { Lock } from "@mui/icons-material";
import {Link} from "react-router-dom";

const ITEM_HEIGHT = 48;

export default function DropdownMenu(props) {

	const [options, setOptions] = useState(props.options);

	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() =>{
		setOptions(props.options)
	},[props.options])

	return (
		<div>
			{/*{1 || props.icon?*/}
			{/*	(<IconButton*/}
			{/*	aria-label="more"*/}
			{/*	id="long-button"*/}
			{/*	aria-controls="long-menu"*/}
			{/*	aria-expanded={open ? "true" : undefined}*/}
			{/*	aria-haspopup="true"*/}
			{/*	onClick={handleClick}*/}
			{/*>*/}
			{/*	/!*<MoreVertIcon className={"text-normal"} />*!/*/}
			{/*	<span className={"text-normal"}>{props.icon}</span>*/}
			{/*</IconButton>)*/}
			{/*:null}*/}

				<Link to={"#"} className={"hover:text-accent"} onClick={handleClick}>{props.text}</Link>

			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "Menu",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: "var(--shade-100)",
						color: "var(--text-normal)",
						marginBottom: 0,
						marginTop:0,
					},
				}}
			>
				{options.map((option) => (
					<span key={option.label}>
						<MenuItem
							onClick={option.onClick}
							sx={[
								{
									"&:hover": {
										backgroundColor:
											"var(--background-secondary-alt)",
									},
								},
							]}
						>
							<ListItemIcon>{option.icon}</ListItemIcon>
							<ListItemText>
								<span className={"text-sm"}>{option.label}</span>
							</ListItemText>
						</MenuItem>
					</span>
				))}
			</Menu>
		</div>
	);
}
