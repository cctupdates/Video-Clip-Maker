import React, { useState, useEffect } from "react";
import "./VideoProgressBar.css";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../features/video/videoSlice";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: 14,
    },
}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;
    const classes = useStylesBootstrap();
    return (
        <Tooltip
            arrow
            classes={classes}
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={value}
        >
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({
    root: {
        color: "#2e2d2d",
        height: 8,
        marginBottom: 0,
        marginLeft: "15px",
        width: "750px",
    },
    thumb: {
        height: 30,
        width: 30,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -6,

        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 16,
        borderRadius: 8,
    },
    rail: {
        height: 16,
        borderRadius: 8,
    },
})(Slider);

function valueLabelFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;
    var microseconds = Math.floor((duration % 1).toFixed(2) * 1000);
    // Output like "1:01" or "4:03:59" or "123:03:59"
    var time = "";

    if (hrs > 0) {
        time += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    time += "" + mins + ":" + (secs < 10 ? "0" : "");
    time += "" + secs;
    if (microseconds < 100) time += ":0" + String(microseconds).slice(0, 1);
    else time += ":" + String(microseconds).slice(0, 2);
    return time;
}

function VideoProgressBar(props) {
    const videoRef = props.videoRef;
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        let v_ref = videoRef.current;
        let slider = document.querySelector(".MuiSlider-thumb");
        if (v_ref !== null) {
            v_ref.addEventListener("timeupdate", () => {
                let v = v_ref.currentTime;
                setValue(v);
                dispatch(setCurrent(v));
                if (v >= slider.getAttribute("aria-valuemax")) {
                    v_ref.pause();
                    props.setPlaying(false);
                    v_ref.currentTime = slider.getAttribute("aria-valuemin");
                }
            });
        }
    }, [videoRef]);

    const handleChange = (event, newValue) => {
        let v_ref = videoRef.current;
        setValue(newValue);
        v_ref.currentTime = newValue;
    };

    return (
        <div className="VideoProgressBar">
            <PrettoSlider
                id="pretto-slider"
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                value={value}
                onChange={handleChange}
                min={props.startingTime}
                max={props.endingTime}
                step={0.1}
                ValueLabelComponent={ValueLabelComponent}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
            />
        </div>
    );
}

export default VideoProgressBar;
