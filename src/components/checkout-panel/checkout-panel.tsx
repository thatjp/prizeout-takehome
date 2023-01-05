import React, { useEffect } from 'react';
import Classnames from 'classnames';
import CheckoutPanelView from './checkout/checkout';
import CheckoutConfirmationPanelView from './checkout-confirmation/checkout-confirmation';
import { useAppSelector } from '../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../slices/common-slice';
import useTransition from 'react-transition-state';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    selectIsCollapsedCheckoutPanelOpen,
    toggleIsCollapsedCheckoutPanelOpen,
    selectSelectedOffer,
    setSelectedDollarAmount,
    CheckoutGiftCard,
    selectSelectedDollarAmount,
    setSelectedOffer,
} from '../../slices/checkout-slice';

import './checkout-panel.less';

export const CheckoutPanel: React.FC = (): React.ReactElement => {
    const isCollapsedCheckoutPanelOpen = useAppSelector(selectIsCollapsedCheckoutPanelOpen);
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const isSelectSelectedOfferPresent = useAppSelector(selectSelectedOffer);
    const selectedGiftCard = useAppSelector(selectSelectedDollarAmount);
    const dispatch = useDispatch<AppDispatch>();
    const [transition, toggleTransition] = useTransition();

    const classes: string = Classnames(
        `checkout-panel z-index-checkout-panel`,
        { 'checkout-panel--side': !isCheckoutPanelCollapsedView },
        { 'checkout-panel--collapsed': isCheckoutPanelCollapsedView },
        { [`checkout-panel--${transition.status}`]: isCheckoutPanelCollapsedView && transition.status },
    );

    const closeCheckoutPanel = () => {
        dispatch(setSelectedDollarAmount(null));
        dispatch(setSelectedOffer(null));
        if (isCollapsedCheckoutPanelOpen) {
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    const setSelectedPrizeValue = (dollarAmount: CheckoutGiftCard) => {
        dispatch(setSelectedDollarAmount(dollarAmount));
    };

    useEffect(() => {
        toggleTransition(isCollapsedCheckoutPanelOpen);
    }, [isCollapsedCheckoutPanelOpen]);

    return (
        <>
            <section className={classes}>
                <CheckoutPanelView
                    onClickHandler={(dollarAmount: CheckoutGiftCard): void => setSelectedPrizeValue(dollarAmount)}
                    selectedOffer={isSelectSelectedOfferPresent}
                    selectedGiftCard={selectedGiftCard}
                />
                <CheckoutConfirmationPanelView closeCheckoutPanel={() => closeCheckoutPanel()} />
            </section>
        </>
    );
};
