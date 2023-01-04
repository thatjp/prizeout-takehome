import React, { useEffect } from 'react';
import Classnames from 'classnames';
import CheckoutPanelView from './checkout/checkout';
import CheckoutConfirmationPanelView from './checkout-confirmation/checkout-confirmation';
import { useAppSelector } from '../../hooks';
import { selectIsCheckoutPanelCollapsed, setAlertState, selectAlertState } from '../../slices/common-slice';
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
} from '../../slices/checkout-slice';
import { Overlay } from '../common';

import './checkout-panel.less';

export const CheckoutPanel: React.FC = (): React.ReactElement => {
    const isCollapsedCheckoutPanelOpen = useAppSelector(selectIsCollapsedCheckoutPanelOpen);
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const isSelectSelectedOfferPresent = useAppSelector(selectSelectedOffer);
    const isAlertState = useAppSelector(selectAlertState);
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
        if (isCollapsedCheckoutPanelOpen) {
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    const setSelectedPrizeValue = (dollarAmount: CheckoutGiftCard) => {
        dispatch(setSelectedDollarAmount(dollarAmount));
    };

    const setAlertStatus = (message: string, alertType: 'error' | 'warning' | 'success' | undefined) => {
        dispatch(
            setAlertState({
                alertType,
                message,
            }),
        );
    };

    const renderCheckoutConfirmation = (checkoutSuccess: string) => {
        if (checkoutSuccess) {
            return <CheckoutConfirmationPanelView />;
        }
    };

    useEffect(() => {
        toggleTransition(isCollapsedCheckoutPanelOpen);
    }, [isCollapsedCheckoutPanelOpen]);

    return (
        <>
            {isCheckoutPanelCollapsedView && isCollapsedCheckoutPanelOpen && (
                <Overlay onClick={() => closeCheckoutPanel()} zIndexType="overlay" />
            )}

            <section className={classes}>
                <CheckoutPanelView
                    onClickHandler={(dollarAmount: CheckoutGiftCard): void => setSelectedPrizeValue(dollarAmount)}
                    onAlertHandler={(message: string, alertType: 'error' | 'warning' | 'success' | undefined): void =>
                        setAlertStatus(message, alertType)
                    }
                    selectedOffer={isSelectSelectedOfferPresent}
                    selectedGiftCard={selectedGiftCard}
                />

                {renderCheckoutConfirmation(isAlertState?.alertType)}
            </section>
        </>
    );
};
