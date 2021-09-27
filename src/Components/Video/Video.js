import React, { useState, useEffect } from 'react'
import Konva from 'konva'
import VideoProgressBar from './VideoProgressBar.js'
import Annotations from '../annotations/Annotations.js'
import Save from '../save/Save.js'
import Clip from '../clips/Clip.js'
import { AppBar, Toolbar } from '@material-ui/core'
import { PlayArrow, Pause, Stop, Replay10, Forward10 } from '@material-ui/icons'
import './Video.css'
import { useDispatch } from 'react-redux'
import { setMetadata } from '../../features/video/videoSlice'
import {
  setInitialState,
  setCurrentClipId,
  addClip,
} from '../../features/clips/clipsSlice.js'
import { setCurrentTime, setClipLayers } from '../../features/canvas/drawSlice'

function Video(props) {
  const videoRef = props.videoRef
  const canvasRef = props.canvasRef
  const dispatch = useDispatch()

  const [playing, setPlaying] = useState(false)
  const [stopped, setStopped] = useState(true)
  const [value, setValue] = useState([0, 100])
  const [startingTime, setStartingTime] = useState(0)
  const [endingTime, setEndingTime] = useState(0)
  const [currentClip, setCurrentClip] = useState('Orignal Video')

  useEffect(() => {
    videoRef.current.currentTime = startingTime
  }, [startingTime])

  const onLoad = (e) => {
    dispatch(
      setMetadata({
        videoHeight: e.target.videoHeight,
        videoWidth: e.target.videoWidth,
        duration: e.target.duration,
      })
    )

    let url = 'http://127.0.0.1:5000/getState'

    fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
        pragma: 'no-cache',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (Object.keys(res).length === 0) {
          const newClip = {
            name: 'Orignal Video',
            startingTime: 0,
            endingTime: e.target.duration,
            annotations: [],
          }
          dispatch(addClip(newClip))
          setEndingTime(e.target.duration)
          setValue([0, e.target.duration])
        } else {
          const clip = res.clips[0]
          setEndingTime(clip.endingTime)
          setValue([clip.startingTime, clip.endingTime])
          res.currentClipId = -1
          res.clips.forEach((clip, index) => {
            if (index !== 0) {
              var layer = new Konva.Layer()
              canvasRef.current.getStage().add(layer)
              dispatch(setClipLayers({ [index]: layer.index }))
            }
          })
          dispatch(setInitialState(res))
          dispatch(setCurrentClipId(0))
        }
      })
  }

  const handlePlay = () => {
    if (videoRef.current.paused) {
      if (stopped) {
        setStopped(false)
        videoRef.current.currentTime = startingTime
      }
      videoRef.current.play()
      setPlaying(true)
      return
    }
    videoRef.current.pause()
    dispatch(setCurrentTime(videoRef.current.currentTime))
    setPlaying(false)
  }

  const handleStop = () => {
    setStopped(!stopped)
    videoRef.current.currentTime = 0
    videoRef.current.pause()
    setPlaying(false)
  }

  const handleForward10 = () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 10,
      videoRef.current.duration
    )
  }

  const handleReplay10 = () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 10,
      0
    )
  }

  return (
    <div className='App'>
      <div className='videoCanvas'>
        <video
          width='1280px'
          height='720px'
          ref={videoRef}
          onLoadedMetadata={onLoad}
          id='video'
        >
          <source src='/Videos/vid.mp4' />
        </video>
      </div>
      <AppBar id='AppBar-1' position='relative' color='inherit'>
        <Toolbar>
          <Replay10 fontSize='large' onClick={handleReplay10} />
          {!playing ? (
            <PlayArrow fontSize='large' onClick={handlePlay} />
          ) : (
            <Pause fontSize='large' onClick={handlePlay} />
          )}
          {stopped ? '' : <Stop fontSize='large' onClick={handleStop} />}
          <Forward10 fontSize='large' onClick={handleForward10} />
          {!stopped ? (
            <VideoProgressBar
              videoRef={videoRef}
              setPlaying={setPlaying}
              startingTime={startingTime}
              endingTime={endingTime}
            />
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
      <AppBar id='AppBar-2' position='relative' color='inherit'>
        <Clip
          videoRef={videoRef}
          startingTime={startingTime}
          setStartingTime={setStartingTime}
          endingTime={endingTime}
          setEndingTime={setEndingTime}
          value={value}
          setValue={setValue}
          currentClip={currentClip}
          setCurrentClip={setCurrentClip}
          canvasRef={canvasRef}
        />
      </AppBar>
      <AppBar id='AppBar-2' position='relative' color='inherit'>
        <Annotations
          currentClip={currentClip}
          value={value}
          canvasRef={canvasRef}
        />
      </AppBar>
      <AppBar id='AppBar-3' position='relative' color='inherit'>
        <Save />
      </AppBar>
    </div>
  )
}

export default Video
