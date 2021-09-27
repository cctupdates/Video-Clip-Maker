import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: "4%",
		marginBottom: "4%",
		width: "95%",
		margin: "auto",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	orignalVideoText: {
		textAlign: "center",
		margin: "0 1em",
	},
	leftGridItem: {
		width: "100%",
		height: "100%",
	},
	rightGridBtn: {
		width: "85%",
		margin: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "150px",
	},
	rightBtn: {
		textAlign: "left",
		textTransform: "none",
		height: "50px",
		background: "#F9FBFF",
		color: "#48B499",
		"&:hover": {
			background: "#48B499",
			color: "#FFFFFF",
		},
	},
}));
