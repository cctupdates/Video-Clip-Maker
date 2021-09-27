import React, { useState, useEffect } from "react";
import { useStyles } from "./ClipSelectorStyles";

import {
  Button,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Konva from "konva";
import { setClipLayers } from "../../features/canvas/drawSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Zoom from "./Zoom.js";
import {
  addClip,
  removeClip,
  setCurrentClipId,
} from "../../features/clips/clipsSlice.js";
import { useParams } from "react-router-dom";

const ClipSelector = (props) => {
  useEffect(() => {
    if (clips[currentClipId]) {
      props.setCurrentClip(clips[currentClipId].name);
    }
  }, []);
  const canvasRef = props.canvasRef;
  const {
    setdisplayNameIndex,
    placeholder,
    height,
    title,
    width,
    options,
    playerName,
    handleChange,
    name,
    border,
    color,
  } = props;

  const classes = useStyles();
  const [addingClip, setAddingClip] = useState(false);
  const [zooming, setZooming] = useState(false);

  const dispatch = useDispatch();
  const clips = useSelector((state) => state.clips.clips);
  const currentClipId = useSelector((state) => state.clips.currentClipId);

  const handleClipChange = (event) => {
    props.setCurrentClip(event.target.value);
    const index = clips.findIndex((clip) => clip.name === event.target.value);
    setdisplayNameIndex(index);
    props.setValue([clips[index].startingTime, clips[index].endingTime]);
    // props.setEndingTime(clips[index].endingTime)
    // props.setStartingTime(clips[index].startingTime)
    dispatch(setCurrentClipId(index));
    setZooming(false);
  };
  return (
    <div>
      <div className={classes.addPlayerForm}>
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-filled-label">
            {placeholder}
          </InputLabel>
          <div>
            <div
              className={classes.inputCustom}
              style={{ width: "100%", height: height }}
            >
              <InputLabel className={classes.dropdownLabel} margin="dense">
                {title}
              </InputLabel>
              <Select
                style={{
                  width: "100%",
                  // marginTop: "-20px",
                  background: "#FFEFD6",
                  height: "50px",
                  border: border,
                }}
                name={name}
                labelId="demo-simple-select-label"
                id="demo-simple-select-filled"
                value={props.currentClip}
                onChange={handleClipChange}
              >
                {clips.map((obj, index) => {
                  return (
                    <MenuItem key={index} value={obj.name}>
                      {obj.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </FormControl>
      </div>
    </div>
  );
};

export default ClipSelector;
