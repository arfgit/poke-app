import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemon } from "../pokemon/pokemonSlice";
import { Grid, Card, Container, Typography } from "@mui/material";

/**
 * COMPONENT
 */
const Home = (props) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const pokemon = useSelector((state) => state.pokemon.allPokemon);

  console.log(pokemon);

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  return (
    <Container className="product-wrapper">
      <h3 className="custom-welcome">Welcome, {username}</h3>
      <Grid container spacing={2.5}>
        {pokemon?.map(({ name, url }, i) => (
          <Grid key={i + 1} item xs={12} sm={6} md={4} className="product-card">
            <Card className="custom-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                  i + 1
                }.svg`}
                alt={`${name}`}
                title={`${name}`}
                className="custom-img"
              />
              <Typography gutterBottom variant="h5" component="h2">{`Entry #${
                i + 1
              } ${name}`}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
