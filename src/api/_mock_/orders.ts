import { mock } from '../axios';

mock.onPost('/order/123').reply(200, {
    order: {
        id: 1,
        name: 'John Smith',
    },
});
