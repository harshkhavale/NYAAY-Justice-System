import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cases: [],
  department: null,
  currentCase: null,
  documents: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setDepartment: (state, action) => {
      state.department = action.payload.department;
    },
    setCurrentCase: (state, action) => {
      state.currentCase = action.payload.currentCase;
    },
    setCases: (state, action) => {
      state.cases = action.payload.cases;
    },
    setDocuments: (state, action) => {
      state.documents = action.payload.documents;
    },
    setDocument: (state, action) => {
      const updatedDocuments = state.documents.map((document) => {
        if (document._id === action.payload.document._id) return action.payload.document;
        return document;
      });
      state.documents = updatedDocuments;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setCases,
  setCase,
  setCurrentCase,
  setDepartment,
  setDocument,setDocuments
} = authSlice.actions;
export default authSlice.reducer;
