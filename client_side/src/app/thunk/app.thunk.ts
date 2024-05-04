import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInitialData = createAsyncThunk(
	"app/fetchImmutableData",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			// fetch initial Data here, return promise gonna go into slice which store all the state
			const accountPromise = "something";
			const accessTokenPromise = " something";

			const [account, accessToken] = await Promise.all([
				accountPromise,
				accessTokenPromise,
			]);
			return {
				account,
				accessToken,
			};
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);
