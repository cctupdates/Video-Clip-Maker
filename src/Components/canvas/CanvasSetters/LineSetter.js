import React from 'react'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'
import ColorSelect from './ColorSelect';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux'
import { setlineCap, setlineJoin, setstrokeWidth, setstroke } from '../../../features/canvas/drawSlice'

import Select from '@material-ui/core/Select';
const LineSetter = () => {
    const dispatch = useDispatch()
    const lineCap = useSelector((state) => state.draw.lineCap)
    const lineJoin = useSelector((state) => state.draw.lineJoin)
    const strokeWidth = useSelector((state) => state.draw.strokeWidth)
    const stroke = useSelector((state) => state.draw.stroke)
    return (
        <Grid container
            spacing={1}
            direction="column"
        >
            <Grid item>
                <Typography variant="subtitle1" color="initial">Stroke Width</Typography>
                <Slider value={strokeWidth} valueLabelDisplay="auto" onChange={(e, newv) => dispatch(setstrokeWidth(newv))} />
            </Grid>
            <Grid item>
                <Grid container spacing={1} justify="space-around">
                    <Grid item>
                        <FormControl style={{ minWidth: 120, marginBottom: 20 }}>
                            <InputLabel>Line Cap</InputLabel>
                            <Select
                                value={lineCap}
                                onChange={(e) => {
                                    dispatch(setlineCap(e.target.value))
                                }}
                            >
                                <MenuItem value={"butt"}>Butt</MenuItem>
                                <MenuItem value={"round"}>Round</MenuItem>
                                <MenuItem value={"square"}>Square</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl style={{ minWidth: 120, marginBottom: 20 }}>
                            <InputLabel>Line Join</InputLabel>
                            <Select
                                value={lineJoin}
                                onChange={(e) => {
                                    dispatch(setlineJoin(e.target.value))
                                }}
                            >
                                <MenuItem value={"miter"}>Miter</MenuItem>
                                <MenuItem value={"round"}>Round</MenuItem>
                                <MenuItem value={"bevel"}>Bevel</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <ColorSelect title="Stroke Color" value={stroke} setColor={setstroke} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LineSetter
