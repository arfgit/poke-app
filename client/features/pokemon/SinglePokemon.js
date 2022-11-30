import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils";
import { fetchSinglePokemon } from "./pokemonSlice";

const SinglePokemon = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const single = useSelector((state) => state.pokemon.singlePokemon);
  const { name } = single;

  console.log(single);

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
      {name}
    </div>
  );
};

export default SinglePokemon;
