import React, { useState, useEffect } from "react";
import Konva from "konva";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    TextField,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";
import {
    addAnnotation,
    editAnnotation,
    removeAnnotation,
} from "../../features/clips/clipsSlice.js";
import {
    setEditMode,
    setNewShape,
    setCurrentShape,
} from "../../features/canvas/drawSlice";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        width: "150px",
    },
    button: {
        margin: theme.spacing(2),
    },
}));

function Annotations(props) {
    const classes = useStyles();
    const canvasRef = props.canvasRef;

    const [currentAnnotation, setCurrentAnnotation] = useState("");
    const [addingAnnotation, setAddingAnnotation] = useState(false);

    const dispatch = useDispatch();
    const clips = useSelector((state) => state.clips.clips);
    const currentClipId = useSelector((state) => state.clips.currentClipId);
    const shapeConfig = useSelector((state) => state.draw);
    const editing = useSelector((state) => state.draw.editMode);

    useEffect(() => {
        setCurrentAnnotation("");
    }, [currentClipId]);

    const handleAnnotationChange = (event) => {
        setCurrentAnnotation(event.target.value);
    };

    const handleAddAnnotation = () => {
        setAddingAnnotation(true);
    };

    const handleRemoveAnnotation = () => {
        dispatch(
            removeAnnotation({
                annotationName: currentAnnotation,
            })
        );
        setCurrentAnnotation("");
    };

    const handleSaveAnnotation = () => {
        const name = document.getElementById("standard-basic").value;
        if (name.trim() === "") {
            alert("Annotation Name cannot be empty!");
            setAddingAnnotation(false);
            return;
        }

        const index = currentClipId;
        const check = clips[index].annotations.filter(
            (annotation) => annotation.name === name
        );

        if (check.length !== 0) {
            alert("Annotation Name already in use!");
            setAddingAnnotation(false);
            return;
        }

        const obj = {
            name,
            startingTime: props.value[0],
            endingTime: props.value[1],
        };
        dispatch(addAnnotation(obj));
        setAddingAnnotation(false);
    };

    const handleEdit = () => {
        const index = currentClipId;
        const annotationIndex = clips[index].annotations.findIndex(
            (annotation) => annotation.name === currentAnnotation
        );

        if (clips[index].annotations[annotationIndex].config) {
            dispatch(
                setCurrentShape(
                    clips[index].annotations[annotationIndex].config
                )
            );
        }
        dispatch(setEditMode());
    };

    const handleSaveEdit = (e) => {
        const index = currentClipId;
        const annotationIndex = clips[index].annotations.findIndex(
            (annotation) => annotation.name === currentAnnotation
        );

        const config = {};
        config.shape = shapeConfig.shape;
        switch (shapeConfig.shape) {
            case "arrow":
                config.points = shapeConfig.points;
                config.pointerLength = shapeConfig.pointerLength;
                config.pointerWidth = shapeConfig.pointerWidth;
                config.strokeWidth = shapeConfig.strokeWidth;
                config.fill = shapeConfig.fill;
                config.stroke = shapeConfig.stroke;
                break;
            case "arc":
                config.points = shapeConfig.points;
                config.innerRadius = shapeConfig.innerRadius;
                config.outerRadius = shapeConfig.outerRadius;
                config.angle = shapeConfig.angle;
                config.fill = shapeConfig.fill;
                config.fillbg = shapeConfig.fillbg;
                break;
            case "circle":
                config.points = shapeConfig.points;
                config.radius = shapeConfig.radius;
                config.strokeWidth = shapeConfig.strokeWidth;
                config.fill = shapeConfig.fill;
                config.stroke = shapeConfig.stroke;
                break;
            case "line":
                config.points = shapeConfig.points;
                config.strokeWidth = shapeConfig.strokeWidth;
                config.lineCap = shapeConfig.lineCap;
                config.lineJoin = shapeConfig.lineJoin;
                config.stroke = shapeConfig.stroke;
                break;
        }

        const obj = {
            index: annotationIndex,
            value: props.value,
            config,
        };
        dispatch(editAnnotation(obj));
        dispatch(setEditMode());
        dispatch(setNewShape());
    };

    return (
        <div>
            <Grid container>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Annotations
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentAnnotation}
                            onChange={handleAnnotationChange}
                        >
                            {clips && clips[currentClipId]
                                ? clips[currentClipId].annotations.map(
                                      (obj, index) => {
                                          return (
                                              <MenuItem
                                                  key={index}
                                                  value={obj.name}
                                              >
                                                  {obj.name}
                                              </MenuItem>
                                          );
                                      }
                                  )
                                : ""}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    {addingAnnotation ? (
                        <>
                            <TextField
                                className={classes.formControl}
                                id="standard-basic"
                                label="Annotation Name"
                            />
                            <Button
                                className={classes.button}
                                variant="contained"
                                size="large"
                                onClick={handleSaveAnnotation}
                            >
                                Save
                            </Button>
                        </>
                    ) : editing ? (
                        <Button
                            className={classes.button}
                            variant="contained"
                            size="large"
                            onClick={handleSaveEdit}
                        >
                            Save
                        </Button>
                    ) : (
                        <>
                            <Button
                                className={classes.button}
                                variant="contained"
                                size="large"
                                onClick={handleAddAnnotation}
                            >
                                Add New Annotation
                            </Button>
                            {currentAnnotation === "" ? (
                                ""
                            ) : (
                                <>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        size="large"
                                        onClick={handleRemoveAnnotation}
                                    >
                                        Remove Annotation
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        size="large"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Annotations;
