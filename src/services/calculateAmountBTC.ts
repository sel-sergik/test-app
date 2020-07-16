export const calculateAmountBTC = (amount: number, btcRate: number) =>
  (amount * (1/btcRate)).toFixed(8);