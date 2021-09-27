import React from 'react'

const Video = ({
  setMetadata,
  setEndingTime,
  setStartingTime,
  setValue,
  setInitialState,
  setCurrentClipId,
  addClip,
  dispatch,
  history,
  currentClipId,
  clips,
  videoFunction,
  videoRef,
}) => {
  return (
    <div>
      <video
        controls
        width='100%'
        height='auto'
        ref={videoRef}
        onLoadedMetadata={(e) =>
          videoFunction(
            e,
            setMetadata,
            setEndingTime,
            setValue,
            setInitialState,
            setCurrentClipId,
            addClip,
            dispatch,
            history,
            currentClipId,
            clips,
            setStartingTime
          )
        }
        id='video'
      >
        <source src='/Videos/vid.mp4' />
      </video>
    </div>
  )
}

export default Video
