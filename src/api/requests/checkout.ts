import axios from '../axios';
import { ExtendedCheckoutGiftCard } from '../../slices/checkout-slice';

/*--------------------------------------------------
Create New Checkout
--------------------------------------------------*/
export const postNewCheckout = async (reqData: ExtendedCheckoutGiftCard) => {
    try {
        const response = await axios.post(`/order/123`, reqData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        return error;
    }
};
