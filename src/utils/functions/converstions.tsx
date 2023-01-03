export const centToDollar: (cents: number) => void = (cents: number) =>
    (cents / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });
