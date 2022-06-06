import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../interface/IComment';
const initProfile: Profile = {
	userName: 'Người lạ',
	status: 6 * 60,
	avatarURL: 'https://i.postimg.cc/J0Yq1kR6/avatar.png',
	myName: 'Đặng Nhật Trường',
	myAvatarUrl: 'https://i.postimg.cc/9Xb1jCQr/atphizyom.jpg',
};

const profile: Profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : initProfile;

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
