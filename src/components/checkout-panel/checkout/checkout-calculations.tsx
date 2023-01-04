import React from 'react';
import { selectSelectedDollarAmount } from '../../../slices/checkout-slice';
import { useAppSelector } from '../../../hooks';
import { centToDollar, calcBonusTotal } from '../../../utils/functions';

import './checkout-calculations.less';

const CheckoutCalculations: React.FC = (): React.ReactElement => {
    const selectedGiftCard = useAppSelector(selectSelectedDollarAmount);

    return (
        <section className="payout-calculations">
            <div className="grid grid--two-columns">
                <div className="grid__item">
                    <p>Redemption Amount</p>
                    <p className="blue">Prizeout Bonus (+{selectedGiftCard?.display_bonus}%)</p>
                    <p>You Get</p>
                </div>
                <div className="grid__item">
                    {selectedGiftCard ? (
                        <>
                            <p>{`${centToDollar(selectedGiftCard.value_in_cents)}`}</p>
                            <p className="blue">
                                {`${centToDollar(
                                    calcBonusTotal(selectedGiftCard.value_in_cents, selectedGiftCard.display_bonus),
                                )}`}
                            </p>
                            <p>
                                {`${centToDollar(
                                    calcBonusTotal(selectedGiftCard.value_in_cents, selectedGiftCard.display_bonus) +
                                        selectedGiftCard.value_in_cents,
                                )}`}
                            </p>
                        </>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default CheckoutCalculations;
