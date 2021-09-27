import Konva from "konva";

export const drawLine = (canvasRef, start, end, annotation, currentClipId) => {
    const layer = canvasRef.current.getStage().children[currentClipId];
    const points = annotation.points;
    const stroke = annotation.stroke;
    const lineCap = annotation.lineCap;
    const lineJoin = annotation.lineJoin;

    var line = new Konva.Line({
        x: points[0],
        y: points[1],
        points: [0, 0, 0, 0],
        stroke,
        lineCap,
        lineJoin,
    });

    layer.add(line);

    const dur = (end - start) * 1000;
    var stepX = (points[2] - points[0]) * 1.0;
    var stepY = (points[3] - points[1]) * 1.0;

    var anim = new Konva.Animation(function (frame) {
        if (
            line.points()[2] > Math.abs(points[2] - points[0]) ||
            line.points()[3] > Math.abs(points[3] - points[1])
        ) {
            anim.stop();
        }
        line.points()[2] += (stepX * frame.timeDiff) / dur;
        line.points()[3] += (stepY * frame.timeDiff) / dur;
    }, layer);

    anim.start();
};
