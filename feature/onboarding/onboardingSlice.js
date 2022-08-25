import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboarding: true,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    showOnboarding(state, action) {
      state.onboarding = action.payload;
    },
  },
});

export const onboardingActions = onboardingSlice.actions;
export const selectOnboarding = (state) => state.onboarding.onboarding;
export default onboardingSlice.reducer;
