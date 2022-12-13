import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPokemon = createAsyncThunk(
  "/fetchAllPokemon",
  async () => {
    try {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=649"
      );

      return data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const fetchSinglePokemon = createAsyncThunk(
  "/fetchSinglePokemon",
  async (id) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    allPokemon: [],
    singlePokemon: {},
    singleDesc: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.fulfilled, (state, action) => {
      state.allPokemon = action.payload.results;
    });

    builder.addCase(fetchSinglePokemon.fulfilled, (state, action) => {
      state.singlePokemon = action.payload;
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
