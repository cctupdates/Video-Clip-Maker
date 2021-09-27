import { createSlice } from "@reduxjs/toolkit";

export const drawSlice = createSlice({
    name: "draw",
    initialState: {
        shape: "circle",
        points: [],
        pointerLength: 20,
        pointerWidth: 20,
        fill: "#f44336",
        fillbg: "#ffeb3b",
        stroke: "#f44336",
        strokeWidth: "2",
        lineCap: "butt",
        lineJoin: "miter",
        radius: 20,
        innerRadius: 10,
        outerRadius: 15,
        angle: 90,
        editMode: false,
        newShape: false,
        clipLayers: {},

        // timestamp
        currentTime: 0,
    },
    reducers: {
        setEditMode: (state) => {
            state.editMode = !state.editMode;
            // console.log("🚀 ~ file: drawSlice.js ~ line 35 ~ state.editMode", state.editMode)
        },
        setNewShape: (state) => {
            state.newShape = !state.newShape;
            // console.log("🚀 ~ file: drawSlice.js ~ line 33 ~ state.newShape", state.newShape)
        },
        setCurrentShape: (state, action) => {
            state.shape = action.payload.shape;
            switch (action.payload.shape) {
                case "arrow":
                    state.pointerLength = action.payload.pointerLength;
                    state.pointerWidth = action.payload.pointerWidth;
                    state.strokeWidth = action.payload.strokeWidth;
                    state.fill = action.payload.fill;
                    state.stroke = action.payload.stroke;
                    break;
                case "arc":
                    state.innerRadius = action.payload.innerRadius;
                    state.outerRadius = action.payload.outerRadius;
                    state.angle = action.payload.angle;
                    state.fill = action.payload.fill;
                    state.fillbg = action.payload.fillbg;
                    break;
                case "circle":
                    state.radius = action.payload.radius;
                    state.strokeWidth = action.payload.strokeWidth;
                    state.fill = action.payload.fill;
                    state.stroke = action.payload.stroke;
                    break;
                case "line":
                    state.strokeWidth = action.payload.strokeWidth;
                    state.lineCap = action.payload.lineCap;
                    state.lineJoin = action.payload.lineJoin;
                    state.stroke = action.payload.stroke;
                    break;
            }
        },
        setShape: (state, action) => {
            state.shape = action.payload;
            console.log(action.payload);
        },
        setPoints: (state, action) => {
            state.points = action.payload;
        },
        // state setter methods
        setpointerLength: (state, action) => {
            state.pointerLength = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 127 ~ state.pointerLength", state.pointerLength)
        },
        setpointerWidth: (state, action) => {
            state.pointerWidth = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 131 ~ state.pointerWidth", state.pointerWidth)
        },
        setfill: (state, action) => {
            state.fill = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 135 ~ state.fill", state.fill)
        },
        setfillbg: (state, action) => {
            state.fillbg = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 139 ~ state.fillbg", state.fillbg)
        },
        setstroke: (state, action) => {
            state.stroke = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 143 ~ state.stroke", state.stroke)
        },
        setstrokeWidth: (state, action) => {
            state.strokeWidth = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 147 ~ state.strokeWidth", state.strokeWidth)
        },
        setlineCap: (state, action) => {
            state.lineCap = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 151 ~ state.lineCap", state.lineCap)
        },
        setlineJoin: (state, action) => {
            state.lineJoin = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 155 ~ state.lineJoin", state.lineJoin)
        },
        setradius: (state, action) => {
            state.radius = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 159 ~ state.radius", state.radius)
        },
        setinnerRadius: (state, action) => {
            state.innerRadius = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 163 ~ state.innerRadius", state.innerRadius)
        },
        setouterRadius: (state, action) => {
            state.outerRadius = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 167 ~ state.outerRadius", state.outerRadius)
        },
        setangle: (state, action) => {
            state.angle = action.payload;
            // console.log("🚀 ~ file: drawSlice.js ~ line 171 ~ state.angle", state.angle)
        },
        setClipLayers: (state, action) => {
            state.clipLayers = {
                ...state.clipLayers,
                ...action.payload,
            };
            // console.log("🚀 ~ file: drawSlice.js ~ line 227 ~ state.clipLayers", state.clipLayers)
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
            // console.log("🚀 ~ file: clipsSlice.js ~ line 19 ~ state.currentTime", state.currentTime)
        },
    },
});

export const {
    setNewShape,
    setCurrentShape,
    setEditMode,
    setShape,
    setPoints,
    setpointerLength,
    setpointerWidth,
    setfill,
    setfillbg,
    setstroke,
    setstrokeWidth,
    setlineCap,
    setlineJoin,
    setradius,
    setinnerRadius,
    setouterRadius,
    setangle,
    setClipLayers,
    setCurrentTime,
} = drawSlice.actions;

export default drawSlice.reducer;
