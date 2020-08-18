interface IBTCRateState {
  btcRate: number;
}

export const btcRateSelector = (state: IBTCRateState) => state.btcRate;
