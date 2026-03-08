import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  credit: 0,
  debt: 0
}

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    updateSummary: (state, action) => {
      state.credit = action.payload.credit
      state.debt = action.payload.debt
    }
  }
})

export const { updateSummary } = summarySlice.actions
export default summarySlice.reducer