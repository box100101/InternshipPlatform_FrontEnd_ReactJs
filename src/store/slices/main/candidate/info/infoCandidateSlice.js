import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const infoCandidateSlice = createSlice({
  name: "info_candidate",
  initialState: {
    candidateInfoById: {},
    candidateInfoByUsername: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCandidateById.fulfilled, (state, { payload }) => {
      state.candidateInfoById = payload;
    });
    builder.addCase(getCandidateByUserName.fulfilled, (state, { payload }) => {
      state.candidateInfoByUsername = payload;
    });
  },
});

export const getCandidateById = createAsyncThunk(
  "info_candidate/getCandidateById",
  async (id) => {
    return axios
      .get(`${baseURL}/api/r2s/admin/candidate/${id}?no=0&limit=20`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getCandidateByUserName = createAsyncThunk(
  "info_candidate/getCandidateByUserName",
  async (name) => {
    return axios
      .get(`${baseURL}/api/applylist/candidate/user/${name}?no=0&limit=20`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export default infoCandidateSlice;
