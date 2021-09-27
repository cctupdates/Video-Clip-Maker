import React from 'react'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'
import ColorSelect from './ColorSelect';
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { setpointerLength, setpointerWidth, setstrokeWidth, setfill, setstroke } from '../../../features/canvas/drawSlice'
const ArrowSetter = () => {
    const dispatch = useDispatch()
    const pointerLength = useSelector((state) => state.draw.pointerLength)
    const pointerWidth = useSelector((state) => state.draw.pointerWidth)
    const strokeWidth = useSelector((state) => state.draw.strokeWidth)
    const fill = useSelector((state) => state.draw.fill)
    const stroke = useSelector((state) => state.draw.stroke)

    return (
        <Grid container
            spacing={1}
            direction="column"
        >
            <Grid item>
                <Typography variant="subtitle1" color="initial">Pointer Length</Typography>
                <Slider value={pointerLength} valueLabelDisplay="auto" onChange={(e, newvalue) => dispatch(setpointerLength(newvalue))} />
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="initial">Pointer Width</Typography>
                <Slider value={pointerWidth} valueLabelDisplay="auto" onChange={(e, newvalue) => dispatch(setpointerWidth(newvalue))} />
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

export default ArrowSetter
