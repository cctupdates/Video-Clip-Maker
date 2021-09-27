import React, { useEffect } from "react";
import { drawCircle } from "../Draw/drawCircle.js";
import { drawArrow } from "../Draw/drawArrow.js";
import { drawLine } from "../Draw/drawLine.js";
import { drawArc } from "../Draw/drawArc.js";
import { useSelector } from "react-redux";

function Animate(props) {
    const videoRef = props.videoRef;
    const canvasRef = props.canvasRef;

    const currentClipId = useSelector((state) => state.clips.currentClipId);
    const clips = useSelector((state) => state.clips.clips);

    useEffect(() => {
        if (
            clips &&
            clips[currentClipId] &&
            clips[currentClipId].annotations.length !== 0
        ) {
            console.log(currentClipId);
            let v_ref = videoRef.current;
            if (v_ref !== null) {
                v_ref.addEventListener("timeupdate", () => {
                    let v = v_ref.currentTime;
                    if (
                        Math.abs(
                            v - clips[currentClipId].annotations[0].startingTime
                        ) <= 0.1
                    ) {
                        const start =
                            clips[currentClipId].annotations[0].startingTime;
                        const end =
                            clips[currentClipId].annotations[0].endingTime;
                        switch (
                            clips[currentClipId].annotations[0].config.shape
                        ) {
                            case "circle":
                                drawCircle(
                                    canvasRef,
                                    start,
                                    end,
                                    clips[currentClipId].annotations[0].config,
                                    currentClipId
                                );
                                break;
                            case "line":
                                console.log(start, end, currentClipId);
                                drawLine(
                                    canvasRef,
                                    start,
                                    end,
                                    clips[currentClipId].annotations[0].config,
                                    currentClipId
                                );
                                break;
                            case "arrow":
                                drawArrow(
                                    canvasRef,
                                    start,
                                    end,
                                    clips[currentClipId].annotations[0].config,
                                    currentClipId
                                );
                                break;
                            case "arc":
                                drawArc(
                                    canvasRef,
                                    start,
                                    end,
                                    clips[currentClipId].annotations[0].config,
                                    currentClipId
                                );
                                break;
                        }
                    }
                });
            }
        }
    }, [videoRef, currentClipId]);

    return <div></div>;
}

export default Animate;
