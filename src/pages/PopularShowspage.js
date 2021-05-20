import { Checkbox, CircularProgress, FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { makeStyles, Grid } from '@material-ui/core';
import showContext from "../reducers/showContext";
import Showitem from "../components/Showitem";
import ratingsData from "../data/ratings.json"

const useStyles = makeStyles((theme) => ({
    formControl: {
        backgroundColor: '#fff',
        margin: theme.spacing(1),
        minWidth: theme.spacing(20),
        maxWidth: theme.spacing(30),
        borderRadius: theme.spacing(1)
    },
    load: {
        display: 'flex',
        justifyContent: 'center',
        height: '50vh',
        alignItems: 'center'
    }
}));



const genreName = [
    "Action",
    "Crime",
    "Science-Fiction",
    "Drama",
    "Horror",
    "Romance",
    "Thriller",
    "Espionage",
    "Adventure",
    "Music",
    "Supernatural",
    "Fantasy",
    "Family",
    "Anime",
    "Comedy",
    "Mystery",
    "Medical",
    "Legal",
    "Western"
];


const PopularShowspage = () => {
    const classes = useStyles();
    const [genre, setGenre] = useState([]);
    const [rating, setRating] = useState(9);
    const { filterShows, getfilterShows, loading } = useContext(showContext);

    useEffect(() => {
        getfilterShows(rating, genre);
        console.log(rating, genre);
        // eslint-disable-next-line
    }, [rating, genre]);


    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    const handleChangeRating = (event) => {
        setRating(event.target.value);
    };

    const ratings = ratingsData;

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item sm container justify="flex-end">
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="select-filled-label">Rating</InputLabel>
                        <Select
                            labelId="select-filled-label"
                            id="simple-select-filled"
                            value={rating}
                            onChange={handleChangeRating}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em>Please select rating</em>
                            </MenuItem>
                            {ratings.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm container justify="flex-start">
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="mutiple-checkbox-label" className={classes.label}>Genres</InputLabel>
                        <Select
                            disableUnderline={true}
                            labelId="mutiple-checkbox-label"
                            id="mutiple-checkbox"
                            multiple
                            value={genre}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            {genreName.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={genre.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {loading && <div className={classes.load}>
                <CircularProgress />
            </div>}

            <Grid container justify="center">


                <Grid container justify="center">
                    {filterShows && filterShows.map((item) =>
                        <Grid item key={item.id}>
                            <Showitem {...item} key={item.id} />
                        </Grid>
                    )}
                </Grid>


            </Grid>
        </div>
    )
}

export default PopularShowspage;