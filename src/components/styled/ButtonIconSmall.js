
const {styled, IconButton} = require("@mui/material");

const ButtonIconSmall = styled(IconButton)(({theme, color = 'primary'}) => ({
    ':hover': {
        backgroundColor: 'var(--bg-blue-600)',
        color:"white",
    },
    color:"var(--text-normal)",
    borderRadius: "5px",
    padding: "0.2rem",
    fontSize: "1em",
}));

export default ButtonIconSmall;
