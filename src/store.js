import { configureStore } from "@reduxjs/toolkit";
import drawReducer from "./features/canvas/drawSlice";
import videoReducer from "./features/video/videoSlice";
import clipsReducer from "./features/clips/clipsSlice";

export default configureStore({
    reducer: {
        draw: drawReducer,
        video: videoReducer,
        clips: clipsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
