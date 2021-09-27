export const handleSave = (state) => {
  let url = 'http://127.0.0.1:5000/saveState'

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  }

  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((res) => console.log(res))
}

export const onLoad = (
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
  clips
) => {
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
      if (Object.keys(res.clips).length === 0) {
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
        const clip = res.clips[currentClipId ? currentClipId : 0]

        if (clip !== undefined) {
          setEndingTime(clips[0].endingTime)
          setValue([clip.startingTime, clip.endingTime])

          dispatch(setInitialState(res))
          if (currentClipId > 0) {
            dispatch(setCurrentClipId(currentClipId))
          } else {
            dispatch(setCurrentClipId(0))
          }
        }
      }
    })
}
export const onLoadVideoAnalytics = (
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
  clips
) => {
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
        const clip = res.clips[currentClipId ? currentClipId : 0]

        if (clip !== undefined) {
          setEndingTime(clip.endingTime)
          setValue([clip.startingTime, clip.endingTime])

          dispatch(setInitialState(res))
          if (currentClipId > 0) {
            dispatch(setCurrentClipId(currentClipId))
          } else {
            dispatch(setCurrentClipId(0))
          }
        }
      }
    })
}

export const onLoadAnimation = (
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
) => {
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
      if (Object.keys(res.clips).length === 0) {
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
        const clip = res.clips[currentClipId ? currentClipId : 0]

        if (clip !== undefined) {
          setStartingTime(clip.startingTime)
          setEndingTime(clip.endingTime)
          setValue([clip.startingTime, clip.endingTime])

          dispatch(setInitialState(res))
          if (currentClipId > 0) {
            dispatch(setCurrentClipId(currentClipId))
          } else {
            dispatch(setCurrentClipId(0))
          }
        }
      }
    })
}
export const handleSaveClip = (
  clipName,
  setAddingClip,
  clips,
  value,
  addClip,
  setclipName,
  dispatch,
  history
) => {
  let name = clipName
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

  const startingTime = value[0]
  const endingTime = value[1]
  const newClip = {
    name,
    startingTime,
    endingTime,
    annotations: [],
  }
  dispatch(addClip(newClip))

  setclipName('')
  history.push('/edit-clip')

  setAddingClip(false)
}

export const handleEditClip = (
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
) => {
  let name = editClipName
  const startingTime = value[0]
  const endingTime = value[1]
  const newClip = {
    name,
    startingTime,
    endingTime,
    annotations: [],
  }

  const index = clips.findIndex((obj) => obj.name === name)

  if (index > -1) {
    dispatch(editClip(newClip))
  }

  setclipName('')

  setAddingClip(false)
}

export const handleSaveAnimation = (
  clipName,
  setAddingClip,
  clips,
  value,
  addClip,
  setclipName,
  dispatch,
  history,
  addAnnotation
) => {
  let name = clipName
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

  const startingTime = value[0]
  const endingTime = value[1]
  const newClip = {
    name,
    startingTime,
    endingTime,
  }
  dispatch(addAnnotation(newClip))

  setclipName('')

  setAddingClip(false)
}

export const handleScaleChange = (
  e,
  setScale,
  setSecondIndex,
  setMin,
  setMax,
  value,
  currentZoom,
  startingTime,
  endingTime
) => {
  let newScale = parseFloat(e.target.value.split(' ')[0])
  setScale(newScale)
  setSecondIndex(
    parseFloat(e.target.value.split(' ')[0]) > 0.25
      ? parseInt(e.target.value.split(' ')[0], 10) + 1
      : 0
  )
  setMin(Math.max(value[currentZoom] - newScale, startingTime))
  setMax(Math.min(value[currentZoom] + newScale, endingTime))
}

export const handleRemoveClip = (
  dispatch,
  removeClip,
  currentClip,
  setCurrentClip,
  setValue,
  clips,
  setEndingTime,
  setStartingTime,
  setCurrentClipId
) => {
  dispatch(removeClip(currentClip))
  setCurrentClip('Orignal Video')
  setValue([clips[0].startingTime, clips[0].endingTime])
  setEndingTime(clips[0].endingTime)
  setStartingTime(clips[0].startingTime)
  dispatch(setCurrentClipId(0))
}
