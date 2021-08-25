import React, { useState } from 'react';

import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = ({setCoordinates}) => {
    const classes = useStyles();

    const [autoComplete, setAutocomplete] = useState(null);

    const onLoad = (auto) => setAutocomplete(auto);

    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
    }


    return (
        <AppBar position="static" style = {{backgroundColor: "black"}}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Companion
                </Typography>
                <Box display="flex">
                <Typography variant="h6" className={classes.title}>
                    Explore...
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Find a place..." classes={{root: classes.inputRoot, input: classes.inputInput}} />
                    </div>
                </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;