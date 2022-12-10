import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemon } from "../pokemon/pokemonSlice";
import { Grid, Card, Container, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../loading/Loading";

/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const username = useSelector((state) => state.auth.me.username);
  const pokemon = useSelector((state) => state.pokemon.allPokemon);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  if (!pokemon) <Loading />;

  return (
    <>
      <h3 className="custom-welcome">Welcome, {username}</h3>
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <TextField
          onChange={handleSearchChange}
          placeholder="ditto"
          variant="standard"
        />
      </div>
      <Container className="product-wrapper">
        <Grid container spacing={2.5}>
          {pokemon?.map(
            ({ name }, i) =>
              name.includes(filter) && (
                <Grid
                  key={i + 1}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className="product-card"
                >
                  <Link to={`/pokemon/${i + 1}`}>
                    <Card className="custom-card">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                          i + 1
                        }.svg`}
                        alt={`${name}`}
                        title={`${name}`}
                        className="custom-img"
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >{`Entry #${
                        i + 1 < 10
                          ? `00${i + 1}`
                          : i + 1 < 100
                          ? `0${i + 1}`
                          : i + 1
                      } ${capitalizeFirstLetter(name)}`}</Typography>
                    </Card>
                  </Link>
                </Grid>
              )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
