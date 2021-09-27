import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import { useStyles } from './HomeStyles'

import Button from '@material-ui/core/Button'
import VideoCarousel from './VideoCarousel/VideoCarousel'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onLoadVideoAnalytics } from '../utils/MakeClipsFunctions'
import { setMetadata } from '../../../features/video/videoSlice'
import {
  setInitialState,
  setCurrentClipId,
  addClip,
} from '../../../features/clips/clipsSlice.js'
import Video from '../Shared/Video'
const Home = ({ videoRef, canvasRef }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  ////useStateSection//////

  let [secondsArray] = useState([
    '0.25 seconds',
    '0.5 seconds',
    '1 seconds',
    '2 seconds',
    '3 seconds',
    '4 seconds',
    '5 seconds',
  ])

  const [value, setValue] = useState([0, 100])

  const [endingTime, setEndingTime] = useState(0)

  ///useStateSection End////
  //useSelectorSection////
  const clips = useSelector((state) => state.clips.clips)
  const currentClipId = useSelector((state) => state.clips.currentClipId)
  const state = useSelector((state) => state.clips)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8} className={classes.leftGridItem}>
          <Video
            setMetadata={setMetadata}
            setEndingTime={setEndingTime}
            setValue={setValue}
            setInitialState={setInitialState}
            setCurrentClipId={setCurrentClipId}
            addClip={addClip}
            dispatch={dispatch}
            history={history}
            currentClipId={currentClipId}
            clips={clips}
            videoFunction={onLoadVideoAnalytics}
            videoRef={videoRef}
          />
          {/* kunal  code */}

          <p className={classes.orignalVideoText}>Original Video</p>
          <VideoCarousel
            clips={clips}
            currentClipId={currentClipId}
            setCurrentClipId={setCurrentClipId}
            dispatch={dispatch}
          />
        </Grid>

        <Grid item xs={4}>
          <div className={classes.rightGridBtn}>
            <Button
              onClick={() => history.push('./make-clip')}
              className={classes.rightBtn}
              variant='contained'
            >
              Make a new clip
            </Button>

            <Button
              onClick={() => history.push(`/edit-clip`)}
              className={classes.rightBtn}
              variant='contained'
            >
              Edit this clip
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
