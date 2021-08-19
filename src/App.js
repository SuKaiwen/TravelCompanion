import React, {useEffect, useState} from 'react';

import Header from './components/Header/header';
import List from './components/List/list';
import Map from './components/Map/map';

import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filterPlaces, setFilterPlaces] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data);
            setFilterPlaces([]);
            setIsLoading(false);
        });
    }, [type, coordinates, bounds]);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating );
        setFilterPlaces(filteredPlaces);
    }, [rating]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style = {{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List
                        places = {filterPlaces.length ? filterPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places = {filterPlaces.length ? filterPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;