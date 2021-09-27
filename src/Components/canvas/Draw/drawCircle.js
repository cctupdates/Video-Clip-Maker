import Konva from "konva";

export const drawCircle = (
    canvasRef,
    start,
    end,
    annotation,
    currentClipId
) => {
    const layer = canvasRef.current.getStage().children[currentClipId];
    const points = annotation.points;
    const radius = annotation.radius;
    const strokeWidth = annotation.strokeWidth;
    const fill = annotation.fill;
    const stroke = annotation.stroke;

    var circle = new Konva.Circle({
        x: points[0],
        y: points[1],
        radius,
        fill,
        stroke,
        strokeWidth,
    });

    layer.add(circle);

    const dur = (end - start) * 1000;
    var stepX = (points[2] - points[0]) * 1.0;
    var stepY = (points[3] - points[1]) * 1.0;

    var disX = 0;
    var disY = 0;

    var anim = new Konva.Animation(function (frame) {
        if (
            disX > Math.abs(points[2] - points[0]) ||
            disY > Math.abs(points[3] - points[1])
        ) {
            anim.stop();
        }
        disX += (stepX * frame.timeDiff) / dur;
        disY += (stepY * frame.timeDiff) / dur;
        circle.x(circle.x() + (stepX * frame.timeDiff) / dur);
        circle.y(circle.y() + (stepY * frame.timeDiff) / dur);
    }, layer);

    anim.start();
};
