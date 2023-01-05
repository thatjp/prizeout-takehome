import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import CheckoutCalculations from './checkout-calculations';
import CheckoutPayouts from './checkout-payouts';
import { GiftCard } from '../../common/ui-widgets/gift-card';
import { CheckoutGiftCard } from '../../../slices/checkout-slice';

import './checkout.less';

export interface PanelProps {
    selectedOffer: any;
    onClickHandler: (dollarAmount: CheckoutGiftCard) => void;
    selectedGiftCard: CheckoutGiftCard;
}

const CheckoutPanelView: React.FC<PanelProps> = ({
    selectedOffer,
    onClickHandler,
    selectedGiftCard,
}): React.ReactElement => {
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    {selectedOffer ? <GiftCard name={selectedOffer.name} imgUrl={selectedOffer.image_url} /> : null}
                </div>
                <div className="grid__item">
                    <CheckoutPayouts selectedOffer={selectedOffer} onClickHandler={onClickHandler} />
                    <CheckoutCalculations />
                    <CheckoutButton offerName={selectedOffer?.name} checkoutData={selectedGiftCard} />
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
