import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import Animate from "./Animate/Animate.js";
import { setPoints } from "../../features/canvas/drawSlice.js";
import "./Canvas.css";

function Canvas(props) {
    const canvasRef = props.canvasRef;
    const videoRef = props.videoRef;

    const dispatch = useDispatch();
    const metadata = useSelector((state) => state.video.metadata);
    const newShape = useSelector((state) => state.draw.newShape);
    const editMode = useSelector((state) => state.draw.editMode);

    const currentClipId = useSelector((state) => state.clips.currentClipId);

    React.useEffect(() => {
        canvasRef.current.getStage().children.forEach((layer) => {
            layer.hide();
        });
        if (canvasRef.current.getStage().children[currentClipId]) {
            canvasRef.current.getStage().children[currentClipId].show();
        }
    }, [currentClipId, canvasRef]);

    let points = [];

    const handleClick = (e) => {
        if (editMode) {
            if (points.length < 4) {
                points = [
                    ...points,
                    e.target.getStage().getPointerPosition().x,
                    e.target.getStage().getPointerPosition().y,
                ];
            }
            if (points.length == 4) {
                dispatch(setPoints(points));
                points = [];
            }
        }
    };

    return (
        <div>
            <Stage
                ref={canvasRef}
                className="canvas"
                height={metadata?.videoHeight}
                width={metadata?.videoWidth}
                onClick={handleClick}
                onMouseEnter={(e) => {
                    e.target.getStage().container().style.cursor = newShape
                        ? "crosshair"
                        : null;
                }}
                onMouseLeave={(e) => {
                    e.target.getStage().container().style.cursor = "default";
                }}
            >
                <Layer></Layer>
            </Stage>
            <Animate videoRef={videoRef} canvasRef={canvasRef} />
        </div>
    );
}

export default Canvas;
