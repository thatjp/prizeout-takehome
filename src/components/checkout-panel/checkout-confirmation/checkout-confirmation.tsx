import React from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import { Button } from '../../common/form-components';
import { ViewEnum } from '../../../slices/checkout-slice';

import './checkout-confirmation.less';

interface SetViewPropsExtended extends SetViewProps {
    closeCheckoutPanel: () => void;
}

const CheckoutConfirmationPanelView: React.FC<SetViewPropsExtended> = ({
    setView,
    closeCheckoutPanel,
}): React.ReactElement => {
    const handleClick = (viewType: ViewEnum) => {
        closeCheckoutPanel();
        setView(viewType);
    };

    return (
        <section className="checkout-confirmation">
            <div>
                <h2>Checkout Confirmation</h2>
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
