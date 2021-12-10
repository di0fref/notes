import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    arrow: {
        "&:before": {
            border: "1px solid black"
        },
        color: "black"
    },
    tooltip: {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
    }
}));

export default function ArrowTooltips(props) {
    let classes = useStyles();

    return (
        <Tooltip
            placement={"right"}
            title={props.title}
            arrow
            classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
        >
            <span className={"text-sm"}>{props.children}</span>
        </Tooltip>
    );
}