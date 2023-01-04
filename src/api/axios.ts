import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
export const mock = new MockAdapter(axios, { delayResponse: 2000 });

const getBaseURL = (env: string) => {
    switch (env) {
        case 'development':
            return 'http://localhost:8069';
        case 'staging':
            return '';
        case 'production':
            return '';
        default:
            return '';
    }
};

mock.onPost('/order/123').reply(200, {
    order: {
        id: 123,
        status: 'Success',
    },
});

const baseUrl = getBaseURL(process.env.NODE_ENV);

const instance = axios.create({
    baseURL: `${baseUrl}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
