import React from 'react'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'
import ColorSelect from './ColorSelect';
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { setradius, setstroke, setstrokeWidth, setfill } from '../../../features/canvas/drawSlice'

const CircleSetter = () => {
    const dispatch = useDispatch()
    const radius = useSelector((state) => state.draw.radius)
    const stroke = useSelector((state) => state.draw.stroke)
    const strokeWidth = useSelector((state) => state.draw.strokeWidth)
    const fill = useSelector((state) => state.draw.fill)

    return (
        <Grid container
            spacing={1}
            direction="column"
        >
            <Grid item>
                <Typography variant="subtitle1" color="initial">Radius</Typography>
                <Slider value={radius} valueLabelDisplay="auto" onChange={(e, newvalue) => dispatch(setradius(newvalue))} />
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="initial">Stroke Width</Typography>
                <Slider value={strokeWidth} valueLabelDisplay="auto" onChange={(e, newvalue) => dispatch(setstrokeWidth(newvalue))} />
            </Grid>
            <Grid item>
                <Grid container spacing={1} justify="space-around">
                    <Grid item>
                        <ColorSelect title="Color" value={fill} setColor={setfill} />
                    </Grid>
                    <Grid item>
                        <ColorSelect title="Stroke Color" value={stroke} setColor={setstroke} />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default CircleSetter
