import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { Button } from '../../common';
import { GiftCard } from '../../common/ui-widgets/gift-card';
import { centToDollar } from '../../../utils/functions';

import './checkout.less';

export interface PanelProps {
    selectedOffer: any;
}

const CheckoutPanelView: React.FC<PanelProps> = (selectedOffer: any): React.ReactElement => {
    console.log('selectedOffer', selectedOffer.selectedOffer);
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">Display Gift Card Here</section>
                    {selectedOffer.selectedOffer ? (
                        <GiftCard
                            name={selectedOffer.selectedOffer.name}
                            imgUrl={selectedOffer.selectedOffer.image_url}
                        />
                    ) : null}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <section className="checkout__brand">Display Gift Card Here</section>
                        <div className="grid grid--four-columns">
                            {selectedOffer.selectedOffer
                                ? selectedOffer.selectedOffer.giftcard_list.map((giftCard: any, idx: number) => (
                                      <Button
                                          key={idx}
                                          ariaLabel=""
                                          text={`${centToDollar(giftCard.value_in_cents)}`}
                                          className="grid__item button--blue"
                                          color="blue"
                                          size="small"
                                      />
                                  ))
                                : null}
                        </div>
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
