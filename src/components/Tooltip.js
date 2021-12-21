import Tooltip from "@mui/material/Tooltip";
import {withStyles } from "@mui/styles";

const ArrowTooltips = withStyles({
    arrow: {
        "&:before": {
            border: "1px solid black"
        },
        color: "black"
    },
    tooltip: {
        backgroundColor: "black",
        color: "white",
        fontSize:"0.75rem"
    }
})(Tooltip);

export default ArrowTooltips
