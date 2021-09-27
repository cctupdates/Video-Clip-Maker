import React from 'react'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch } from 'react-redux'


const colors = [
    {
        name: "Red",
        hex: "#f44336"
    },
    {
        name: "Pink",
        hex: "#e91e63"
    },
    {
        name: "Purple",
        hex: "#9c27b0"
    },
    {
        name: "Blue",
        hex: "#2196f3"
    },
    {
        name: "Teal",
        hex: "#009688"
    },
    {
        name: "Yellow",
        hex: "#ffeb3b"
    },
    {
        name: "Indigo",
        hex: "#3f51b5"
    },
    {
        name: "Orange",
        hex: "#ff9800"
    },
    {
        name: "Gray",
        hex: "#9e9e9e"
    },

]
const ColorSelect = ({ title = "select Color", value = "#f44336", setColor }) => {
    const dispatch = useDispatch()

    return (
        <FormControl style={{ minWidth: 120 }}>
            <InputLabel>{title}</InputLabel>
            <Select
                value={value}
                onChange={(e) => {
                    dispatch(setColor(e.target.value))
                }}
            >
                {colors.map((color) => (
                    <MenuItem value={color.hex} key={color.hex}>

                        <Grid container spacing={1} justify="space-evenly" alignContent="center" alignItems="center">
                            <Grid item style={{ height: 25, width: 25, backgroundColor: [color.hex], borderRadius: "50%", marginLeft: 10 }}></Grid>
                            <Grid item xs>
                                {color.name}
                            </Grid>
                        </Grid>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ColorSelect
