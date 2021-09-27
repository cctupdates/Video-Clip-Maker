import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Zoom from './Zoom.js'
import {
  addClip,
  removeClip,
  setCurrentClipId,
} from '../../features/clips/clipsSlice.js'
import {
  Button,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Typography,
  Tooltip,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Konva from 'konva'
import { setClipLayers } from '../../features/canvas/drawSlice.js'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    width: '150px',
  },
  button: {
    margin: theme.spacing(2),
  },
}))

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 14,
  },
}))

const PrettoSlider = withStyles({
  root: {
    color: '#2e2d2d',
    height: 8,
    marginBottom: 0,
    marginLeft: '15px',
    width: '500px',
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -6,

    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 16,
    borderRadius: 8,
  },
  rail: {
    height: 16,
    borderRadius: 8,
  },
})(Slider)

function ValueLabelComponent(props) {
  const { children, open, value } = props
  const classes = useStylesBootstrap()
  return (
    <Tooltip
      arrow
      classes={classes}
      open={open}
      enterTouchDelay={0}
      placement='top'
      title={value}
    >
      {children}
    </Tooltip>
  )
}

function valueLabelFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600)
  var mins = ~~((duration % 3600) / 60)
  var secs = ~~duration % 60
  var microseconds = Math.floor((duration % 1).toFixed(2) * 1000)
  // Output like "1:01" or "4:03:59" or "123:03:59"
  var time = ''
  if (hrs > 0) {
    time += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }
  if (mins > 0) {
    time += '' + mins + ':' + (secs < 10 ? '0' : '')
  }

  time += '' + secs
  if (microseconds < 100) time += ':0' + String(microseconds).slice(0, 1)
  else time += ':' + String(microseconds).slice(0, 2)
  return time
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

function Clips(props) {
  const videoRef = props.videoRef
  const canvasRef = props.canvasRef

  const classes = useStyles()
  const [addingClip, setAddingClip] = useState(false)
  const [zooming, setZooming] = useState(false)

  const dispatch = useDispatch()
  const clips = useSelector((state) => state.clips.clips)
  const currentClipId = useSelector((state) => state.clips.currentClipId)

  const handleClipChange = (event) => {
    props.setCurrentClip(event.target.value)
    const index = clips.findIndex((clip) => clip.name === event.target.value)
    props.setValue([clips[index].startingTime, clips[index].endingTime])
    props.setEndingTime(clips[index].endingTime)
    props.setStartingTime(clips[index].startingTime)
    dispatch(setCurrentClipId(index))
    setZooming(false)
  }

  const handleAddClip = () => {
    setAddingClip(true)
  }

  const handleRemoveClip = () => {
    dispatch(removeClip(props.currentClip))
    props.setCurrentClip('Orignal Video')
    props.setValue([clips[0].startingTime, clips[0].endingTime])
    props.setEndingTime(clips[0].endingTime)
    props.setStartingTime(clips[0].startingTime)
    dispatch(setCurrentClipId(0))
  }

  const handleSaveClip = () => {
    const name = document.getElementById('standard-basic').value
    if (name.trim() === '') {
      alert('Clip Name cannot be empty!')
      setAddingClip(false)
      return
    }

    const check = clips.filter((clip) => clip.name === name)
    if (check.length !== 0) {
      alert('Clip Name already in use!')
      setAddingClip(false)
      return
    }

    const startingTime = props.value[0]
    const endingTime = props.value[1]
    const newClip = {
      name,
      startingTime,
      endingTime,
      annotations: [],
    }
    dispatch(addClip(newClip))

    // Add layers
    var layer = new Konva.Layer()
    canvasRef.current.getStage().add(layer)
    dispatch(setClipLayers({ [currentClipId]: layer.index }))

    setAddingClip(false)
  }

  const handleZoom = () => {
    setZooming((prevState) => !prevState)
  }

  const handleSliderValueChange = (event, newValue) => {
    let changed = -1
    if (props.value[0] !== newValue[0]) changed = 0
    else changed = 1

    if (
      changed !== -1 &&
      props.videoRef !== null &&
      props.videoRef.current !== null
    ) {
      props.videoRef.current.currentTime = newValue[changed]
    }
    props.setValue(newValue)
  }

  return (
    <div>
      <Grid container>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Clip</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={props.currentClip}
              onChange={handleClipChange}
            >
              {clips.map((obj, index) => {
                return (
                  <MenuItem key={index} value={obj.name}>
                    {obj.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          {addingClip ? (
            <>
              <TextField
                className={classes.formControl}
                id='standard-basic'
                label='Clip Name'
              />
              <Button
                className={classes.button}
                variant='contained'
                size='large'
                onClick={handleSaveClip}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                className={classes.button}
                variant='contained'
                size='large'
                onClick={handleAddClip}
              >
                Add New Clip
              </Button>
              {props.currentClip === 'Orignal Video' ? (
                <Button
                  className={classes.button}
                  variant='contained'
                  size='large'
                  disabled
                >
                  Remove Clip
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  variant='contained'
                  size='large'
                  onClick={handleRemoveClip}
                >
                  Remove Clip
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <div className='VideoProgressBar'>
        <Typography id='range-slider' gutterBottom>
          Clip Range
        </Typography>
        <PrettoSlider
          id='slider'
          valueLabelDisplay='auto'
          aria-label='pretto slider'
          value={props.value}
          onChange={handleSliderValueChange}
          min={props.startingTime}
          max={props.endingTime}
          step={0.01}
          ValueLabelComponent={ValueLabelComponent}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
        />
      </div>
      {zooming ? (
        <Zoom
          videoRef={props.videoRef}
          startingTime={props.startingTime}
          endingTime={props.endingTime}
          handleZoom={handleZoom}
          value={props.value}
          setValue={props.setValue}
        />
      ) : (
        <Button
          className={classes.button}
          variant='contained'
          size='large'
          onClick={handleZoom}
        >
          Zoom
        </Button>
      )}
    </div>
  )
}

export default Clips
