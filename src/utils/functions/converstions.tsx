export const centToDollar: (cents: number) => void = (cents) =>
    (cents / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

export const calcBonusTotal = (total: number, bonus: number): number => {
    return (bonus / 100) * total;
};
