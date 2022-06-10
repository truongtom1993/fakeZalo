import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../interface/IMessage';
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
