import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemon } from "../pokemon/pokemonSlice";
import {
  Grid,
  Card,
  Container,
  Typography,
  TextField,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";

/* COMPONENTS */
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("default");

  const username = useSelector((state) => state.auth.me.username);
  const _pokemon = useSelector((state) => state.pokemon.allPokemon);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  /* Filter Pokemon By Regions */
  const filters = {
    default: (pokemon) => pokemon,
    Gen1: (pokemon) => _pokemon.indexOf(pokemon) < 151,
    Gen2: (pokemon) =>
      _pokemon.indexOf(pokemon) >= 151 && _pokemon.indexOf(pokemon) < 251,
    Gen3: (pokemon) =>
      _pokemon.indexOf(pokemon) >= 251 && _pokemon.indexOf(pokemon) < 386,
    Gen4: (pokemon) =>
      _pokemon.indexOf(pokemon) >= 386 && _pokemon.indexOf(pokemon) < 493,
    Gen5: (pokemon) =>
      _pokemon.indexOf(pokemon) >= 493 && _pokemon.indexOf(pokemon) < 649,
  };

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  if (!_pokemon) <Loading />;

  return (
    <>
      <h3 className="custom-welcome">Welcome</h3>
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <TextField
          onChange={handleSearchChange}
          placeholder="pikachu"
          variant="standard"
          style={{ width: "150px" }}
        />
        <label>Filter: </label>
        <select name="filter" onChange={(e) => setFilter(e.target.value)}>
          <option value="default">None</option>
          <option value="Gen1">Kanto</option>
          <option value="Gen2">Johto</option>
          <option value="Gen3">Hoenn</option>
          <option value="Gen4">Sinnoh</option>
          <option value="Gen5">Unova</option>
        </select>
      </div>
      <Container className="product-wrapper">
        <Grid container spacing={2.5}>
          {[..._pokemon]?.filter(filters[filter])?.map((pokemon, i) => {
            const pokeIds = _pokemon.indexOf(pokemon);
            return (
              pokemon.name.includes(search) && (
                <Grid
                  key={i + 1}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className="product-card"
                >
                  <Link to={`/pokemon/${pokeIds + 1}`}>
                    <Card className="custom-card">
                      <CardMedia
                        onLoad={() => "Loading..."}
                        component="img"
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                          pokeIds + 1
                        }.svg`}
                        alt={`${pokemon.name}`}
                        title={`${pokemon.name}`}
                        className="custom-img"
                        align="center"
                        sx={{
                          paddingTop: "1em",
                          objectFit: "contain",
                        }}
                      />

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="poke-name"
                        align="center"
                      >{`Entry #${
                        pokeIds + 1 < 10
                          ? `00${pokeIds + 1}`
                          : pokeIds + 1 < 100
                          ? `0${pokeIds + 1}`
                          : pokeIds + 1
                      } ${capitalizeFirstLetter(pokemon.name)}`}</Typography>
                    </Card>
                  </Link>
                </Grid>
              )
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
