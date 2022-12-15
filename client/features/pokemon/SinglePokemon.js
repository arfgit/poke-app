import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";
import {
  Grid,
  Card,
  Container,
  Typography,
  TextField,
  CardMedia,
  Box,
} from "@mui/material";
import { fetchSinglePokemon } from "./pokemonSlice";

/* COMPONENTS */
import Loading from "../loading/Loading";

const SinglePokemon = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const single = useSelector((state) => state.pokemon.singlePokemon);

  const { name, abilities, species, stats, types, height, weight } = single;

  console.log("single object info: ", single);

  useEffect(() => {
    dispatch(fetchSinglePokemon(id));
  }, []);

  if (!single) <Loading />;

  return (
    <Container className="pokemon-view">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} className="image-wrapper">
          <CardMedia
            component="img"
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt={`${name}`}
            title={`${name}`}
            align="center"
            sx={{
              width: "100%",
              height: "100%",
              paddingTop: "1em",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} className="text">
        <Box className="poke-header">
          <Grid item xs={12}>
            <Typography variant="h2">
              {name && capitalizeFirstLetter(name)}
            </Typography>
            <Typography variant="h6">{`#${
              id < 10 ? `00${id}` : id < 100 ? `0${id}` : id
            }`}</Typography>
            <Grid item xs={12} style={{ fontSize: "20px", fontWeight: "700" }}>
              {types?.length <= 1
                ? types?.map((type, i) => (
                    <Typography variant="p" key={i}>
                      {type.type.name.toUpperCase()}
                    </Typography>
                  ))
                : types?.map((type, i) => (
                    <Typography
                      variant="p"
                      style={{ marginRight: "1%" }}
                      key={i}
                    >
                      {type.type.name.toUpperCase() + "  "}
                    </Typography>
                  ))}
            </Grid>
            <Grid item xs={12}>
              <h4 style={{ marginBottom: "-2px" }}>ABILITIES</h4>
              {abilities?.length < 1
                ? abilities[0].ability.ability.name
                : abilities?.map((ability, i) => (
                    <Typography variant="div" key={i}>
                      {ability.ability.name.toUpperCase() + "  "}
                    </Typography>
                  ))}
            </Grid>
          </Grid>
        </Box>

        <Box className="pokeBasics">
          <Grid item xs={12}>
            <Typography variant="div">
              <h4>Height</h4>
              <p>{`${height / 10}m`}</p>
            </Typography>
            <Typography variant="div">
              <h4>Weight</h4>
              <p>{`${weight / 10}kgs`}</p>
            </Typography>
          </Grid>
        </Box>
        <Box className="pokeStats">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h4>Stats</h4>
              {stats?.map((element, i) => (
                <Typography
                  key={i}
                  variant="p"
                >{`${element.stat.name.toUpperCase()}: ${
                  element.base_stat
                }`}</Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default SinglePokemon;
