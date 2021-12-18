import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useEffect, useState} from "react";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { Lock } from "@mui/icons-material";

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
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls="long-menu"
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon className={"text-normal"} />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "Note menu",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: "var(--background-secondary)",
						color: "var(--text-normal)",
					},
				}}
			>
				{options.map((option) => (
					<span key={option.label}>
						{/*{option.divider ? (*/}
						{/*	<Divider*/}
						{/*		sx={{*/}
						{/*			backgroundColor: "var(--text-faint)",*/}
						{/*		}}*/}
						{/*	/>*/}
						{/*) : null}*/}

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
								<span className={"text-s"}>{option.label}</span>
							</ListItemText>
						</MenuItem>
					</span>
				))}
			</Menu>
		</div>
	);
}
