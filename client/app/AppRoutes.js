import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import AllPokemon from "../features/pokemon/AllPokemon";
import SinglePokemon from "../features/pokemon/SinglePokemon";
import { me } from "./store";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon" element={<AllPokemon />} />
        <Route path="/pokemon/:id" element={<SinglePokemon />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
