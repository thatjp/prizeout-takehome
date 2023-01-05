import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface AlertState {
    message: string;
    alertType: 'error' | 'warning' | 'success' | undefined;
}

// Define a type for the slice state
export interface CommonState {
    isCheckoutPanelCollapsedView: boolean;
    isMobilePortraitView: boolean;
    loading: boolean;
    alertState: AlertState;
}

// Define the initial state using that type
export const commonInitialState: CommonState = {
    alertState: null,
    isCheckoutPanelCollapsedView: false,
    isMobilePortraitView: false,
    loading: false,
};

export const commonSlice = createSlice({
    initialState: commonInitialState,
    name: 'common',
    reducers: {
        setAlertState(state, action) {
            state.alertState = action.payload;
        },
        setIsCheckoutPanelCollapsed(state, action: PayloadAction<boolean>) {
            state.isCheckoutPanelCollapsedView = action.payload;
        },
        setIsMobilePortrait(state, action: PayloadAction<boolean>) {
            state.isMobilePortraitView = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setAlertState, setIsCheckoutPanelCollapsed, setIsMobilePortrait, toggleIsLoading } = commonSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = ({ common: { loading } }: RootState): boolean => loading;

export const selectIsCheckoutPanelCollapsed = ({ common: { isCheckoutPanelCollapsedView } }: RootState): boolean =>
    isCheckoutPanelCollapsedView;

export const selectIsMobilePortrait = ({ common: { isMobilePortraitView } }: RootState): boolean =>
    isMobilePortraitView;

export const selectAlertState = ({ common: { alertState } }: RootState): AlertState => alertState;

export default commonSlice.reducer;
