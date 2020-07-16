import { createSelector } from 'reselect';

interface IBTCRateState {
  btcRate: number;
}

export const btcRateSelector = createSelector(
  (state: IBTCRateState) => state.btcRate,
  (btcRate) => btcRate
);
