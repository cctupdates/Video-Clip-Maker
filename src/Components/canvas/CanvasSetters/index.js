import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl, FormControlLabel, Switch } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { setShape, setNewShape } from "../../../features/canvas/drawSlice";
import { useDispatch, useSelector } from "react-redux";
import ArcSetter from "./ArcSetter";
import { Box, Divider, Grid } from "@material-ui/core";
import CircleSetter from "./CircleSetter";
import LineSetter from "./LineSetter";
import ArrowSetter from "./ArrowSetter";

const CanvasSetters = () => {
    const dispatch = useDispatch();
    const shape = useSelector((state) => state.draw.shape);
    const editMode = useSelector((state) => state.draw.editMode);
    const newShape = useSelector((state) => state.draw.newShape);
    const state = useSelector((state) => state.draw);

    return (
        <Box
            style={{ borderRadius: 20, padding: 30, border: "1px solid black" }}
        >
            <Grid container spacing={1} justify="space-around">
                {!editMode ? (
                    <Grid item>
                        <FormControlLabel
                            control={<Switch disabled />}
                            labelPlacement="bottom"
                            label="Add New Shape"
                        />
                    </Grid>
                ) : (
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={newShape}
                                    onChange={(e) => dispatch(setNewShape())}
                                    color="primary"
                                />
                            }
                            labelPlacement="bottom"
                            label="Add New Shape"
                        />
                    </Grid>
                )}
                {editMode && newShape && (
                    <Grid item>
                        <FormControl
                            style={{ minWidth: 120, marginBottom: 20 }}
                        >
                            <InputLabel>Select Shape</InputLabel>
                            <Select
                                value={shape}
                                onChange={(e) => {
                                    dispatch(setShape(e.target.value));
                                }}
                            >
                                <MenuItem value={"arc"}>Arc</MenuItem>
                                <MenuItem value={"circle"}>Circle</MenuItem>
                                <MenuItem value={"arrow"}>Arrow</MenuItem>
                                <MenuItem value={"line"}>Line</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                )}
            </Grid>
            {editMode && newShape && (
                <>
                    <Divider style={{ marginBottom: 20 }} />
                    {shape === "arc" && <ArcSetter />}
                    {shape === "circle" && <CircleSetter />}
                    {shape === "line" && <LineSetter />}
                    {shape === "arrow" && <ArrowSetter />}
                </>
            )}
        </Box>
    );
};

export default CanvasSetters;
