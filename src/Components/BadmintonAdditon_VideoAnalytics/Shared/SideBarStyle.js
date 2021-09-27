import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	sumbitBtnDiv: {
		width: "45%",
		margin: "auto",
	},
	submitBtn: {
		textTransform: "none",
		color: "white",
		margin: "auto",
		borderRadius: "0",
		background: "#BBBBBB",
		width: "100%",
	},
}));
