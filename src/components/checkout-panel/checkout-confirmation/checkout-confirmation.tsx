import React from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import { Button } from '../../common/form-components';
import { ViewEnum } from '../../../slices/checkout-slice';

import './checkout-confirmation.less';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    const handleClick = (viewType: ViewEnum) => {
        setView(viewType);
    };

    return (
        <section className="checkout-confirmation">
            <div>
                <h1>Thank you for your purchase!</h1>
                <Button
                    ariaLabel=""
                    onClick={() => handleClick('checkout')}
                    text="Return to Store"
                    className="button--primary"
                    size="medium"
                    type="button"
                />
            </div>
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
