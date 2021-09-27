import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './EditAnimationStyles'
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
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import SideBar from '../Shared/SideBar'

import { setMetadata } from '../../../features/video/videoSlice'
import {
  setInitialState,
  setCurrentClipId,
  addClip,
} from '../../../features/clips/clipsSlice.js'

import AnimationSelector from '../../clips/AnimationSelector'
import Zoom from '../../clips/Zoom'
import { useSelector } from 'react-redux'

import {
  handleSave,
  onLoad,
  handleSaveClip,
  handleScaleChange,
} from '../utils/MakeClipsFunctions'
const EditAnimation = ({ videoRef, canvasRef }) => {
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
  const [clipName, setclipName] = useState('')

  const [displayNameIndex, setdisplayNameIndex] = useState(0)
  const [addingClip, setAddingClip] = useState(false)

  const [value, setValue] = useState([0, 100])
  const [startingTime, setStartingTime] = useState(0)
  const [endingTime, setEndingTime] = useState(0)
  const [currentClip, setCurrentClip] = useState('Orignal Video')
  ///useStateSection End////
  //useSelectorSection////
  const clips = useSelector((state) => state.clips.clips)
  const currentClipId = useSelector((state) => state.clips.currentClipId)
  const state = useSelector((state) => state.clips)
  //useSelectorSection End///
  //useEffectSection///
  useEffect(() => {
    videoRef.current.currentTime = startingTime
  }, [startingTime])
  useEffect(() => handleSave(state), [state])
  //useEffectSection End////

  const handleChange = (e) => setclipName(e.target.value)
  const onClick = () => setHidden(!hidden)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <video
            controls
            width='100%'
            height='auto'
            ref={videoRef}
            onLoadedMetadata={(e) =>
              onLoad(
                e,
                setMetadata,
                setEndingTime,
                setValue,
                setInitialState,
                setCurrentClipId,
                addClip,
                dispatch
              )
            }
            id='video'
          >
            <source src='/Videos/vid.mp4' />
          </video>

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
                background='#EEFBF8'
                clipName={clipName}
                handleChange={handleChange}
                color='#48B499'
                label='Enter Clip Name'
                height='50px'
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
                  handleSaveClip(
                    clipName,
                    setAddingClip,
                    clips,
                    value,
                    addClip,
                    setclipName,
                    dispatch,
                    history
                  )
                }
              >
                Save Animation
              </Button>
              <Button
                onClick={() => history.push('/')}
                className={classes.addClipBtn}
                variant='contained'
              >
                Home Page
              </Button>
            </div>
          </Card>
          <div className={classes.leftLowerbtns}>
            <Button
              style={{ background: 'white', color: '#48B499' }}
              className={classes.submitWatchBtn}
              variant='outlined'
            >
              Watch all animations
            </Button>
            <Button
              style={{ background: '#48B499', color: '#FFFFFF' }}
              className={classes.submitWatchBtn}
              variant='outlined'
            >
              Submit Animation
            </Button>
          </div>
        </Grid>
        <Grid item xs={3}>
          <SideBar />
          <div>
            <div className={classes.iconBtn}>
              <Typography>No Animation clips in the list! </Typography>

              <IconButton aria-label='delete' className={classes.margin}>
                <ErrorOutlineIcon fontSize='small' />
              </IconButton>
            </div>
            <AnimationSelector
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

            <Button
              style={{
                border: '1px solid #48B499',
                color: '#48B499',
                marginTop: '2em',
                width: '100%',
                justifyContent: 'space-between',
                height: '50px',
                textTransform: 'none',
              }}
              variant='outlined'
              endIcon={<AddIcon />}
            >
              Add animation
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditAnimation
