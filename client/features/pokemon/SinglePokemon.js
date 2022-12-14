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
        <Grid item xs={12}>
          <Typography variant="h2">
            {name && capitalizeFirstLetter(name)}
          </Typography>
          <Typography variant="h6">{`#${
            id < 10 ? `00${id}` : id < 100 ? `0${id}` : id
          }`}</Typography>
        </Grid>

        <Grid item xs={12} className="pokeType">
          {types?.map((type, i) => (
            <Typography variant="div" key={i}>
              {type.type.name.toUpperCase()}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} className="pokeBasics">
          <Typography variant="div">
            <h4>Height</h4>
            <p>{`${height / 10}m`}</p>
          </Typography>
          <Typography variant="div">
            <h4>Weight</h4>
            <p>{`${weight / 10}kgs`}</p>
          </Typography>
        </Grid>
        <Grid container spacing={4} className="pokeAbilities">
          <Grid item xs={12}>
            ABILITIES
            {abilities?.map((ability, i) => (
              <Typography variant="div" key={i}>
                {ability.ability.name}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={4} className="pokeStats">
          <Grid item xs={12}>
            Stats:
            {stats?.map((element, i) => (
              <p
                key={i}
                className="pokestats"
              >{`${element.stat.name.toUpperCase()}: ${element.base_stat}`}</p>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={4} className="pokeAbilities">
          <Grid item xs={12}>
            ABILITIES
            {abilities?.map((ability, i) => (
              <Typography variant="div" key={i}>
                {ability.ability.name}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePokemon;
