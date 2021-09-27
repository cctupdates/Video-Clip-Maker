import React, { useState } from 'react'
import Carousel, {
  arrowsPlugin,
  slidesToShowPlugin,
} from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import { Box, Typography } from '@material-ui/core'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import useStyles from './VideoCarouselStyles'
import an1 from './an1.png'

const Prev = () => {
  const classes = useStyles()
  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <Box className={classes.prevBox}>
        <NavigateBeforeRoundedIcon
          fontSize='large'
          className={classes.navigationIcon}
        />
      </Box>
    </div>
  )
}
const Next = () => {
  const classes = useStyles()
  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <Box className={classes.nextBox}>
        <NavigateNextRoundedIcon
          fontSize='large'
          className={classes.navigationIcon}
        />
      </Box>
    </div>
  )
}

const VideoCarousel = ({
  handleShotTypeChange,
  clips,
  currentClipId,
  setCurrentClipId,
  dispatch,
}) => {
  const classes = useStyles()
  const [crouselValue, setValue] = useState(0)
  const [idState, setIdState] = useState(1)

  const [border, setBorder] = useState('none')
  const handleClick = (index) => {
    setIdState(index)
    dispatch(setCurrentClipId(index))
    setBorder('2px solid black')
  }

  let slides = [
    clips.length > 0 &&
      clips.map((obj, index) => (
        <div
          className={classes.innerImageDiv}
          onClick={(e) => handleClick(index)}
        >
          <div>
            <img
              style={{ border: idState === index ? border : 'none' }}
              className={classes.innerImage}
              src={an1}
              alt=''
            />
          </div>
          <Typography>{obj.name}</Typography>
        </div>
      )),
  ]

  console.log({ currentClipId, idState })
  const onChange = (crouselValue) => {
    setValue(crouselValue)
  }
  return (
    <div style={{ marginTop: '1vw', marginBottom: '3vw' }}>
      {clips.length > 1 && (
        <Carousel
          className={classes.carousel}
          crouselValue={crouselValue}
          onChange={onChange}
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: <Prev />,
                arrowRight: <Next />,
                addArrowClickHandler: true,
              },
            },
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 2,
              },
            },
          ]}
          slides={slides}
        ></Carousel>
      )}
    </div>
  )
}

export default VideoCarousel
