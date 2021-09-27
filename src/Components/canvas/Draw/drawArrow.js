import Konva from "konva";

export const drawArrow = (canvasRef, start, end, annotation, currentClipId) => {
    const layer = canvasRef.current.getStage().children[currentClipId];
    const points = annotation.points;
    const pointerLength = annotation.pointerLength;
    const pointerWidth = annotation.pointerWidth;
    const strokeWidth = annotation.strokeWidth;
    const fill = annotation.fill;
    const stroke = annotation.stroke;

    var arrow = new Konva.Arrow({
        x: points[0],
        y: points[1],
        points: [0, 0, 0, 0],
        pointerLength,
        pointerWidth,
        fill,
        stroke,
        strokeWidth,
    });

    layer.add(arrow);

    const dur = (end - start) * 1000;
    var stepX = (points[2] - points[0]) * 1.0;
    var stepY = (points[3] - points[1]) * 1.0;

    var anim = new Konva.Animation(function (frame) {
        if (
            arrow.points()[2] > Math.abs(points[2] - points[0]) ||
            arrow.points()[3] > Math.abs(points[3] - points[1])
        ) {
            anim.stop();
        }
        arrow.points()[2] += (stepX * frame.timeDiff) / dur;
        arrow.points()[3] += (stepY * frame.timeDiff) / dur;
    }, layer);

    anim.start();
};
