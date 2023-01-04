import React from 'react';
import { Button } from '../../common';
import { CheckoutGiftCard } from '../../../slices/checkout-slice';
import { postNewCheckout } from '../../../api/requests';

interface CheckoutButton {
    checkoutData: CheckoutGiftCard;
    onAlertHandler: (message: string, alertType: string) => void;
}

const CheckoutButton: React.FC<CheckoutButton> = ({ checkoutData, onAlertHandler }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const buttonHandler = async (checkoutData: CheckoutGiftCard) => {
        const resp = await postNewCheckout(checkoutData);
        if (resp.status === 200) {
            onAlertHandler('Order has been Successfully placed!', 'success');
        }
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={() => buttonHandler(checkoutData)}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
