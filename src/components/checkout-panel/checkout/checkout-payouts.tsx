import React from 'react';
import { Button } from '../../common';
import { CheckoutGiftCard } from '../../../slices/checkout-slice';
import { centToDollar } from '../../../utils/functions';

import './checkout-payouts.less';

export interface CheckoutPayoutsProps {
    selectedOffer: any;
    onClickHandler: (dollarAmount: CheckoutGiftCard) => void;
}

const CheckoutPayouts: React.FC<CheckoutPayoutsProps> = ({ selectedOffer, onClickHandler }): React.ReactElement => {
    return (
        <section className="checkout__payouts">
            {selectedOffer ? (
                <>
                    <h4 className="checkout__brand">Select Redemption Amount</h4>
                    <div className="grid grid--small grid--four-columns">
                        {selectedOffer.giftcard_list.map((giftCard: CheckoutGiftCard, idx: number) => (
                            <Button
                                key={idx}
                                ariaLabel=""
                                text={`${centToDollar(giftCard.value_in_cents)}`}
                                className="grid__item button--tertiary"
                                color="blue"
                                size="x-small"
                                onClick={() => onClickHandler(giftCard)}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </section>
    );
};

export default CheckoutPayouts;
