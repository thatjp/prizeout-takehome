import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { Button } from '../../common';
import { GiftCard } from '../../common/ui-widgets/gift-card';
import { centToDollar } from '../../../utils/functions';
import { CheckoutGiftCard } from '../../../slices/checkout-slice';

import './checkout.less';

export interface PanelProps {
    selectedOffer: any;
    onClickHandler: (dollarAmount: CheckoutGiftCard) => void;
    selectedGiftCard: CheckoutGiftCard;
}

const calcdBonusTotal = (total: number, bonus: number) => {
    return (bonus / 100) * total;
};

const CheckoutPanelView: React.FC<PanelProps> = ({
    selectedOffer,
    onClickHandler,
    selectedGiftCard,
}): React.ReactElement => {
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">Display Gift Card Here</section>
                    {selectedOffer ? <GiftCard name={selectedOffer.name} imgUrl={selectedOffer.image_url} /> : null}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <section className="checkout__brand">Select Redemption Amount</section>
                        <div className="grid grid--four-columns">
                            {selectedOffer
                                ? selectedOffer.giftcard_list.map((giftCard: CheckoutGiftCard, idx: number) => (
                                      <Button
                                          key={idx}
                                          ariaLabel=""
                                          text={`${centToDollar(giftCard.value_in_cents)}`}
                                          className="grid__item button--blue"
                                          color="blue"
                                          size="small"
                                          onClick={() => onClickHandler(giftCard)}
                                      />
                                  ))
                                : null}
                        </div>
                        {selectedGiftCard ? (
                            <div className="grid grid--two-columns">
                                <div className="grid__item">
                                    <p>Redemption Amount</p>
                                    <p>Prizeout Bonus (+${selectedGiftCard.display_bonus}%)</p>
                                    <p>You Get</p>
                                </div>
                                <div className="grid__item">
                                    <p>{`${centToDollar(selectedGiftCard.value_in_cents)}`}</p>
                                    {`${centToDollar(
                                        calcdBonusTotal(
                                            selectedGiftCard.value_in_cents,
                                            selectedGiftCard.display_bonus,
                                        ),
                                    )}`}
                                    <p>
                                        {`${centToDollar(
                                            calcdBonusTotal(
                                                selectedGiftCard.value_in_cents,
                                                selectedGiftCard.display_bonus,
                                            ) + selectedGiftCard.value_in_cents,
                                        )}`}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
