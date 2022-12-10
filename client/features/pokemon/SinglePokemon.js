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
  const { name, abilities, species, stats } = single;

  console.log("single object info: ", single);

  useEffect(() => {
    dispatch(fetchSinglePokemon(id));
  }, []);

  if (!single) <Loading />;

  return (
    <div>
      .s
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={`${name}`}
        title={`${name}`}
        className="custom-img-single"
      />
      <h2>{name && capitalizeFirstLetter(name)}</h2>
      <p>Species: {species?.name}</p>
      <div className="ability-container">
        <h4>Abilities:</h4>
        {abilities?.map((ability) => ability.ability.name)}
      </div>
      <div className="stats-container">
        Stats:
        {stats?.map((element) => (
          <p>{`${element.stat.name}: ${element.base_stat}`}</p>
        ))}
      </div>
      {/* {abilities && abilities.map((ability) => <li>{ability}</li>)} */}
    </div>
  );
};

export default SinglePokemon;
