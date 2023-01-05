import React from 'react';
import { Button } from '../../common';
import { CheckoutGiftCard, setCheckoutView, ExtendedCheckoutGiftCard } from '../../../slices/checkout-slice';
import { postNewCheckout } from '../../../api/requests';
import { toggleIsLoading } from '../../../slices/common-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

interface CheckoutButton {
    checkoutData: ExtendedCheckoutGiftCard;
    offerName?: string;
}

const CheckoutButton: React.FC<CheckoutButton> = ({ offerName, checkoutData }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const dispatch = useDispatch<AppDispatch>();
    const buttonHandler = async (offerName: string, checkoutData: CheckoutGiftCard) => {
        const combinedCheckoutData = {
            ...checkoutData,
            offerName,
        };
        dispatch(toggleIsLoading());
        const resp = await postNewCheckout(combinedCheckoutData);
        if (resp.status === 200) {
            dispatch(toggleIsLoading());
            dispatch(setCheckoutView('checkout-confirmation'));
        }
    };

    return (
        <>
            <Button
                isDisabled={checkoutData === null ? true : false}
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={() => buttonHandler(offerName, checkoutData)}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
