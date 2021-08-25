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
    const [price, setPrice] = useState('');
    const [filterPlaces, setFilterPlaces] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);
            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilterPlaces([]);
                setIsLoading(false);
            });
        }
    }, [type, bounds]);

    useEffect(() => {
        console.log(places)
        const filteredPlaces = places.filter((place) => place.rating > rating );
        setFilterPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() => {
        if(price==="$"){
            const filteredPlaces = places;
            setFilterPlaces(filteredPlaces);
        }else if (price==="$$"){
            const filteredPlaces = places.filter((place) => place.price_level === '$$' || place.price_level === '$$ - $$$');
            setFilterPlaces(filteredPlaces);
        }else if (price==="$$$"){
            const filteredPlaces = places.filter((place) => place.price_level === '$$ - $$$' || place.price_level === '$$$');
            setFilterPlaces(filteredPlaces);
        }else{
            const filteredPlaces = places.filter((place) => place.price_level === '$$$$');
            setFilterPlaces(filteredPlaces);
        }
    }, [price])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates = {setCoordinates} />
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
                        price={price}
                        setPrice={setPrice}
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