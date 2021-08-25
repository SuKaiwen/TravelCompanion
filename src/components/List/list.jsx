import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/placedetails';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const List = ( {places, childClicked, isLoading, type, setType, rating, setRating, price, setPrice} ) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    const defaultProps = {
      bgcolor: 'black',
      borderColor: 'text.primary',
      color: 'white',
      m: 1,
      border: 1,
      style: { width: '30%', height: '5rem', minWidth: "200px" },
    };

    return (
        <div className = {classes.container}>
            <Typography variant="h6">Discover more near you!</Typography>
            {isLoading? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>Any Rating</MenuItem>
                    <MenuItem value={2}>Above 2.0</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={3.5}>Above 3.5</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Price</InputLabel>
                <Select value={price} onChange={(e) => setPrice(e.target.value)}>
                    <MenuItem value={"$"}>Any $</MenuItem>
                    <MenuItem value={"$$"}>$$</MenuItem>
                    <MenuItem value={"$$$"}>$$$</MenuItem>
                    <MenuItem value={"$$$$"}>$$$$</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="h6" style = {{marginBottom: "15x"}}>Showing results for... </Typography>
            <div style ={{overflowX: "scroll", display:"flex", marginBottom:"20px"}}>
                <Box borderRadius={16} justifyContent="center" display="flex" alignItems="center" fontSize="20px" fontWeight="fontWeightBold" {...defaultProps}>{type.toUpperCase()}</Box>
                <Box borderRadius={16} justifyContent="center" display="flex" alignItems="center" fontSize="20px" fontWeight="fontWeightBold" {...defaultProps}>{
                    rating? <Rating size="small" value={Number(rating)} precision={0.5} readOnly />:"Any Rating".toUpperCase()
                }</Box>
                <Box borderRadius={16} justifyContent="center" display="flex" alignItems="center" fontSize="20px" fontWeight="fontWeightBold" {...defaultProps}>{
                    price? (price).toUpperCase():"Any Price".toUpperCase()
                }</Box>
            </div>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails
                            place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;