import { RootState } from "../store"
import { settingsSlice } from "./settings-slice"

export const { setSignUpModal } = settingsSlice.actions

export const enableSignUpModal = (state: RootState): any => state.settings.signUpModal
