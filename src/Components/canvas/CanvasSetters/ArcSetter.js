import React from 'react'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'
import ColorSelect from './ColorSelect';
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { setinnerRadius, setouterRadius, setangle, setfill, setfillbg } from '../../../features/canvas/drawSlice'

const ArcSetter = () => {
    const dispatch = useDispatch()
    const innerRadius = useSelector((state) => state.draw.innerRadius)
    const outerRadius = useSelector((state) => state.draw.outerRadius)
    const angle = useSelector((state) => state.draw.angle)
    const fill = useSelector((state) => state.draw.fill)
    const fillbg = useSelector((state) => state.draw.fillbg)


    return (
        <Grid container
            spacing={1}
            direction="column"
        >
            <Grid item>
                <Typography variant="subtitle1" color="initial">Inner Radius</Typography>
                <Slider value={innerRadius} valueLabelDisplay="auto" max={outerRadius} onChange={(e, newv) => { dispatch(setinnerRadius(newv)) }} />
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="initial">Outer Radius</Typography>
                <Slider value={outerRadius} valueLabelDisplay="auto" min={innerRadius} onChange={(e, newv) => { dispatch(setouterRadius(newv)) }} />
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="initial">Angle</Typography>
                <Slider value={angle} valueLabelDisplay="auto" max={360} min={0} onChange={(e, newv) => { dispatch(setangle(newv)) }} />
            </Grid>
            <Grid item>
                <Grid container spacing={1} justify="space-around">
                    <Grid item>
                        <ColorSelect title="Color" value={fill} setColor={setfill} />
                    </Grid>
                    <Grid item>
                        <ColorSelect title="BG Color" value={fillbg} setColor={setfillbg} />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default ArcSetter
