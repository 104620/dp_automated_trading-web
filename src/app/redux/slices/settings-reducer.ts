import { PayloadAction } from "@reduxjs/toolkit"
import { ISettingsState } from "./settings-interface"

export const reducer = {
  setSignUpModal: (state: ISettingsState, action: PayloadAction<boolean>) => {
    state.signUpModal = action.payload
  },
}
