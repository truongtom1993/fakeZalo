import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../interface/IMessage';
const initProfile: Profile = {
	userName: 'Người lạ',
	status: 6 * 60,
	avatarURL:
		'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
	myName: 'Đặng Nhật Trường',
	myAvatarUrl:
		'https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
};

const profile: Profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : initProfile;

const profileSlice = createSlice({
	name: 'profile',
	initialState: { profile },
	reducers: {
		importProfile(state, action: PayloadAction<any>) {
			state.profile = action.payload.profile;
		},
		changeProfile(state, action: PayloadAction<Profile>) {
			state.profile = action.payload;
		},
	},
});
export const { changeProfile, importProfile } = profileSlice.actions;
export default profileSlice.reducer;
