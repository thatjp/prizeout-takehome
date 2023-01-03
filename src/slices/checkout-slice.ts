import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrizeoutOffer } from '../slices/offers-slice';
import type { RootState } from '../store';

export interface CheckoutGiftCard {
    checkout_value_id: string;
    cost_in_cents: number;
    display_bonus: number;
    display_monetary_bonus: number;
    value_in_cents: number;
}

export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    selectedOffer: PrizeoutOffer;
    selectedDollarAmount: CheckoutGiftCard;
    view: ViewEnum;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isCollapsedCheckoutPanelOpen: false,
    loading: false,
    selectedDollarAmount: null,
    selectedOffer: null,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setSelectedDollarAmount(state, action) {
            state.selectedDollarAmount = action.payload;
        },
        setSelectedOffer(state, action) {
            state.selectedOffer = action.payload;
        },
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const {
    setCheckoutView,
    setSelectedDollarAmount,
    setSelectedOffer,
    toggleIsCollapsedCheckoutPanelOpen,
    toggleIsLoading,
} = checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectSelectedOffer = ({ checkout: { selectedOffer } }: RootState): PrizeoutOffer => selectedOffer;

export const selectSelectedDollarAmount = ({ checkout: { selectedDollarAmount } }: RootState): CheckoutGiftCard =>
    selectedDollarAmount;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;
