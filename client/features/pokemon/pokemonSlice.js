import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPokemon = createAsyncThunk(
  "/fetchAllPokemon",
  async () => {
    try {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=649"
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: { allPokemon: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.fulfilled, (state, action) => {
      state.allPokemon = action.payload.results;
    });
  },
});

/*
  ACTIONS
*/

/*
  REDUCER
*/
export default pokemonSlice.reducer;
