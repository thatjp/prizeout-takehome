export const centToDollar: (cents: number) => void = (cents) =>
    (cents / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });
