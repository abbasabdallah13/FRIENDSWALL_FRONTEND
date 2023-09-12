import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({ name, label, handleChange, half, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid style={{marginTop:'0.5rem'}}  item xs={12} sm={half ? 6 : 12}  md={12}>
        <TextField 
            name={name} 
            label={label} 
            variant='outlined'
            required
            fullWidth
            onChange={handleChange} 
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null } 
            xs={6} />
    </Grid>
  )
};

export default Input;
