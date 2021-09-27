import React, { useState, useEffect } from "react";
import { useStyles } from "./ClipSelectorStyles";

import { MenuItem, FormControl, Select } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";

const AnimationSelector = (props) => {
  useEffect(() => {
    if (clips[currentClipId].annotations.length > 0) {
      props.setCurrentClip(clips[currentClipId].annotations[0].name);
    }
  }, []);

  const canvasRef = props.canvasRef;
  const {
    setdisplayNameIndex,

    height,

    name,
    border,
    color,
  } = props;

  const classes = useStyles();

  const [zooming, setZooming] = useState(false);

  const dispatch = useDispatch();
  const clips = useSelector((state) => state.clips.clips);
  const currentClipId = useSelector((state) => state.clips.currentClipId);

  const handleClipChange = (event) => {
    props.setCurrentClip(event.target.value);
    const index = clips[currentClipId].annotations.findIndex(
      (clip) => clip.name === event.target.value
    );
    setdisplayNameIndex(index);

    props.setValue([
      clips[currentClipId].annotations[index].startingTime,
      clips[currentClipId].annotations[index].endingTime,
    ]);
    // props.setEndingTime(clips[currentClipId].annotations[index].endingTime)
    // props.setStartingTime(clips[currentClipId].annotations[index].startingTime)
    // dispatch(setCurrentClipId(index));
    setZooming(false);
  };
  return (
    <div>
      <div className={classes.addPlayerForm}>
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <div>
            <div
              className={classes.inputCustom}
              style={{ width: "100%", height: height }}
            >
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
                defaultValue={
                  clips[currentClipId].annotations.length > 0 &&
                  clips[currentClipId].annotations[0].name
                }
                value={props.currentClip}
                onChange={handleClipChange}
              >
                {clips.length > 0 &&
                  clips[currentClipId].annotations.map((obj, ind) => {
                    return (
                      <MenuItem key={ind} value={obj.name}>
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

export default AnimationSelector;
