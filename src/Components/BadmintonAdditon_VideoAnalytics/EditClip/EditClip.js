import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './EditClipStyles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import IconButton from '@material-ui/core/IconButton'
import Selector from '../Shared/Selector'
import Card from '@material-ui/core/Card'
import InputField from '../Shared/InputField'
import ToogleBtn from '../Shared/ToogleBtn'
import Scale from '../Shared/Scale'
import { useDispatch } from 'react-redux'
import { setMetadata } from '../../../features/video/videoSlice'
import {
  setInitialState,
  setCurrentClipId,
  addClip,
  editClip,
  removeClip,
} from '../../../features/clips/clipsSlice.js'
import { useHistory, useParams } from 'react-router-dom'

import ClipSelector from '../../clips/ClipSelector'
import Zoom from '../../clips/Zoom'
import { useSelector } from 'react-redux'

import Video from '../Shared/Video'
import {
  handleSave,
  onLoad,
  handleEditClip,
  handleScaleChange,
} from '../utils/MakeClipsFunctions'
const EditClip = ({ videoRef, canvasRef }) => {
  const history = useHistory()

  const classes = useStyles()

  const dispatch = useDispatch()
  ////useStateSection//////
  const [hidden, setHidden] = useState(false)
  let [secondsArray] = useState([
    '0.25 seconds',
    '0.5 seconds',
    '1 seconds',
    '2 seconds',
    '3 seconds',
    '4 seconds',
    '5 seconds',
  ])
  const [secondIndex, setSecondIndex] = useState(3)
  const [scale, setScale] = useState(2)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(4)
  const [currentZoom, setCurrentZoom] = useState(0)

  const [clipNameArray, setclipnameArray] = useState([])

  const [clipName, setclipName] = useState('')
  const [addingClip, setAddingClip] = useState(false)

  const [value, setValue] = useState([0, 100])
  const [startingTime, setStartingTime] = useState(0)
  const [endingTime, setEndingTime] = useState(0)
  const [currentClip, setCurrentClip] = useState('Orignal Video')
  ///useStateSection End////
  //useSelectorSection////
  const clips = useSelector((state) => state.clips.clips)
  const currentClipId = useSelector((state) => state.clips.currentClipId)
  const [displayNameIndex, setdisplayNameIndex] = useState(currentClipId)
  const state = useSelector((state) => state.clips)
  //useSelectorSection End///
  //useEffectSection///
  useEffect(() => {
    videoRef.current.currentTime = startingTime
  }, [startingTime])
  useEffect(() => handleSave(state), [state])

  useEffect(() => {
    clips.length > 0 && setclipName(clips[displayNameIndex].name)
  }, [handleScaleChange])
  //useEffectSection End////
  let editClipName =
    clips[displayNameIndex] !== undefined && clips[displayNameIndex].name
  const handleChange = (e) => setclipName(e.target.value)
  const onClick = () => setHidden(!hidden)
  const animatePageRoute = () => history.push('/add-animation')

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
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
            videoFunction={onLoad}
            videoRef={videoRef}
          />

          {/* tanul  code */}
          <Card className={classes.scaleCard}>
            <div className={classes.scaleimgDiv}>
              <Scale
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
                setCurrentZoom={setCurrentZoom}
              />
            </div>
            {hidden && (
              <div className={classes.scaleimgDiv}>
                <Zoom
                  videoRef={videoRef}
                  startingTime={startingTime}
                  endingTime={endingTime}
                  value={value}
                  setValue={setValue}
                  secondIndex={secondIndex}
                  setSecondIndex={setSecondIndex}
                  scale={scale}
                  min={min}
                  max={max}
                  setMin={setMin}
                  setMax={setMax}
                  currentZoom={currentZoom}
                />
              </div>
            )}

            <div className={classes.toogleDiv}>
              <InputField
                background='#FCFCFC'
                clipName={
                  clips[displayNameIndex] !== undefined && clips.length > 0
                    ? clips[displayNameIndex].name
                    : ''
                }
                handleChange={handleChange}
                color='#9F9F9F'
                height='50px'
                disabled='true'
              />

              {hidden && (
                <div className={classes.toggleButtons}>
                  <Button className={classes.scaleBTN} variant='outlined'>
                    Scale
                  </Button>

                  <Selector
                    options={secondsArray}
                    border={'1px solid #7984A1'}
                    playerName={secondsArray[secondIndex]}
                    width='100%'
                    fullWidth='fullWidth'
                    handleChange={(e) =>
                      handleScaleChange(
                        e,
                        setScale,
                        setSecondIndex,
                        setMin,
                        setMax,
                        value,
                        currentZoom,
                        startingTime,
                        endingTime
                      )
                    }
                    color='#FCFCFC'
                    height='
									50%'
                  />
                </div>
              )}
              <ToogleBtn onClick={onClick} text='Mark Accurately' />
            </div>

            <div className={classes.addClipBtnContainer}>
              <Button
                className={classes.addClipBtn}
                variant='contained'
                onClick={(e) =>
                  handleEditClip(
                    clipName,
                    setAddingClip,
                    clips,
                    value,
                    addClip,
                    setclipName,
                    dispatch,
                    editClip,
                    removeClip,
                    editClipName
                  )
                }
              >
                Save Clip
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.rightGridBtn}>
            <div className={classes.iconBtn}>
              <Typography>No clips in the list! </Typography>

              <IconButton aria-label='delete' className={classes.margin}>
                <ErrorOutlineIcon fontSize='small' />
              </IconButton>
            </div>
            {clipNameArray.length > 0 ? (
              <ClipSelector
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
                setdisplayNameIndex={setdisplayNameIndex}
              />
            ) : (
              <ClipSelector
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
                setdisplayNameIndex={setdisplayNameIndex}
              />
            )}
            <div className={classes.rightGridBtn}>
              <ToogleBtn
                onClick={animatePageRoute}
                hidebtn='none'
                text='Animate this clip'
                height='45px'
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditClip
