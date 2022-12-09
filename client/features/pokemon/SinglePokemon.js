import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";
import { fetchSinglePokemon } from "./pokemonSlice";

const SinglePokemon = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const single = useSelector((state) => state.pokemon.singlePokemon);
  const { name, abilities } = single;

  console.log("single object info: ", single);

  useEffect(() => {
    dispatch(fetchSinglePokemon(id));
  }, []);

  return (
    <div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={`${name}`}
        title={`${name}`}
        width={500}
        height={500}
        className="custom-img"
      />

      {name && capitalizeFirstLetter(name)}
      <br />
      {abilities && abilities[0].ability.name}
      <br />
      {abilities && abilities[1].ability.name}
      {/* {abilities && abilities.map((ability) => <li>{ability}</li>)} */}
    </div>
  );
};

export default SinglePokemon;
