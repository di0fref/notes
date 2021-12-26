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


				<Link to={"#"} className={"hover:text-accent text-sm"} onClick={handleClick}>{props.text}</Link>

			<Menu
				dense
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "Menu",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: "var(--shade-50)",
						color: "var(--text-normal)",
						minWidth:"200px",
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
