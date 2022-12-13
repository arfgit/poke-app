import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";
import Loading from "../loading/Loading";
import { fetchSinglePokemon } from "./pokemonSlice";

const SinglePokemon = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const single = useSelector((state) => state.pokemon.singlePokemon);

  const { name, abilities, species, stats, types } = single;

  console.log("single object info: ", single);

  useEffect(() => {
    dispatch(fetchSinglePokemon(id));
  }, []);

  if (!single) <Loading />;

  return (
    <div>
      <div className="single-pokemon-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={`${name}`}
          title={`${name}`}
          className="custom-img-single"
        />
        <h2>{name && capitalizeFirstLetter(name)}</h2>
      </div>

      <div className="single-pokemon-info">
        <p>Species: {species?.name}</p>
        <div className="ability-container">
          <h4>Abilities:</h4>
          {abilities?.map((ability, i) => (
            <div key={i}>
              <ul>{ability.ability.name}</ul>
            </div>
          ))}
        </div>
        <div className="stats-container">
          Stats:
          {stats?.map((element, i) => (
            <p
              key={i}
              className="pokestats"
            >{`${element.stat.name.toUpperCase()}: ${element.base_stat}`}</p>
          ))}
        </div>
        <div className="type-container">
          Types:
          {types?.map((type, i) => (
            <p key={i}>{type.type.name.toUpperCase()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePokemon;
