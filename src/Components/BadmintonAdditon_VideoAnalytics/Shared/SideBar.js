import React from "react";
import Selector from "./Selector.js";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useStyles } from "./SideBarStyle.js";
const SideBar = () => {
	const classes = useStyles();
	return (
		<div>
			<Paper className={classes.paper}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Selector
							options={["Animation type"]}
							playerName="Animation type"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["Shape"]}
							playerName="Shape"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["Radius"]}
							playerName="Radius"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["Stroke"]}
							playerName="Stroke"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["Color"]}
							playerName="Color"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["XYZ"]}
							playerName="XYZ"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["XYZ"]}
							playerName="XYZ"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["XYZ"]}
							playerName="XYZ"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["XYZ"]}
							playerName="XYZ"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["XYZ"]}
							playerName="XYZ"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={6}>
						<Selector
							options={["XYZ"]}
							playerName="XYZ"
							width="100%"
							fullWidth="fullWidth"
							color="#EBEFF9"
							height="45px"
							borderRadius="0"
						/>
					</Grid>
					<Grid item xs={12}>
						<div className={classes.sumbitBtnDiv}>
							<Button
								className={classes.submitBtn}
								variant="contained"
							>
								Submit
							</Button>
						</div>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default SideBar;
