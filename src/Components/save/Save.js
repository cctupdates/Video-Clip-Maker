import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: '#000000',
    color: '#ffffff',
  },
}))

function Save() {
  const classes = useStyles()

  const state = useSelector((state) => state.clips)

  const handleSave = () => {
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

  return (
    <div>
      <Button
        className={classes.button}
        variant='contained'
        size='large'
        onClick={handleSave}
      >
        Add Clip
      </Button>
    </div>
  )
}

export default Save
