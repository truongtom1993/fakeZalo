import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profile } from '../data/data';
import { Profile } from '../interface/IComment';

const profileSlice = createSlice({
	name: 'profile',
	initialState: { profile },
	reducers: {
		changeProfile(state, action: PayloadAction<Profile>) {
			state.profile = action.payload;
		},
	},
});
export const { changeProfile } = profileSlice.actions;
export default profileSlice.reducer;
