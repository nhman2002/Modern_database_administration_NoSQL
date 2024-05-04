import { createSlice } from "@reduxjs/toolkit";
import Account from "../interface/app.interface";
import { fetchInitialData } from "../thunk/app.thunk";

const initialState: Account = {
	id: "",
	userName: "",
	password: "",
	accessToken: "",
};

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchInitialData.fulfilled, (state, action) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
		});
	},
});

export const { setAccessToken } = accountSlice.actions;

export default accountSlice;
