import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  margin: {
    height: theme.spacing(3),
  },
}))

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

function ValueLabelComponent(props) {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const IOSSlider = withStyles({
  root: {
    color: '#F4F7FF',
    height: 2,
    padding: '15px 0',
    marginTop: '2em',
    marginBottom: '3em',
  },

  thumb: {
    borderRadius: '0px',
    height: '60px',
    width: 3,
    backgroundColor: '#324371',
    boxShadow: iOSBoxShadow,
    marginTop: -16.2,
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: '36px',
  },
  rail: {
    height: 2,
    opacity: 0,
    backgroundColor: 'grey',
  },
  mark: {
    backgroundColor: 'black',
    height: '30px',
    width: 1,
    marginTop: -3,
  },
  markActive: {
    background: 'rgba(75, 94, 145, 0.28)',
    opacity: 1,
    height: '30px',
  },
})(Slider)

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className='bar' />
      <span className='bar' />
      <span className='bar' />
    </span>
  )
}

export default function Scale({
  videoRef,
  startingTime,
  setStartingTime,
  endingTime,
  setEndingTime,
  value,
  setValue,
  currentClip,
  setCurrentClip,
  canvasRef,
  setCurrentZoom,
}) {
  const classes = useStyles()

  const handleSliderValueChange = (event, newValue) => {
    let changed = -1
    if (value[0] !== newValue[0]) changed = 0
    else changed = 1
    setCurrentZoom(changed)
    if (changed !== -1 && videoRef !== null && videoRef.current !== null) {
      videoRef.current.currentTime = newValue[changed]
    }
    setValue(newValue)
  }

  let i = 0
  let divisions = 5
  const marks = []
  while (divisions * i <= endingTime) {
    marks.push({ value: divisions * i })
    i++
  }
  return (
    <div className={classes.root}>
      <IOSSlider
        aria-label='ios slider'
        marks={marks}
        valueLabelDisplay='on'
        step={0.01}
        ValueLabelComponent={ValueLabelComponent}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        value={value}
        onChange={handleSliderValueChange}
        min={startingTime}
        max={endingTime}
      />
    </div>
  )
}
