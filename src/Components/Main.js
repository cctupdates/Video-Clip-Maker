import React from 'react'
import './Main.css'

import MakeClip from './BadmintonAdditon_VideoAnalytics/MakeClip/MakeClip'
import EditClip from './BadmintonAdditon_VideoAnalytics/EditClip/EditClip'
import AddAnimation from './BadmintonAdditon_VideoAnalytics/AddAnimation/AddAnimation'
import EditAnimation from './BadmintonAdditon_VideoAnalytics/EditAnimation/EditAnimation'
import Home from './BadmintonAdditon_VideoAnalytics/Home/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
function Main() {
  const videoRef = React.createRef()
  const canvasref = React.createRef()

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home videoRef={videoRef} canvasref={canvasref} />
          </Route>
          <Route exact path='/make-clip'>
            <MakeClip videoRef={videoRef} canvasref={canvasref} />{' '}
          </Route>
          <Route exact path='/edit-clip'>
            <EditClip videoRef={videoRef} canvasref={canvasref} />
          </Route>

          <Route exact path='/add-animation'>
            <AddAnimation videoRef={videoRef} canvasref={canvasref} />
          </Route>
          <Route exact path='/edit-animation'>
            <EditAnimation videoRef={videoRef} canvasref={canvasref} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Main
