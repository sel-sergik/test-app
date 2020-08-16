import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { calculateAmountBTC } from '@services/calculateAmountBTC';

import { btcRateSelector } from '@selectors/btcSelectors';

import { Avatar } from '@components/base/Avatar/Avatar';

import './TradeAdvancedInfo.scss';

interface ITradeAdvancedInfoProps {
  avatar: string;
  buyerPosReputation: number;
  buyerNegReputation: number;
  buyerNumberOfTrades: number;
  tradeIsPaid: boolean;
  tradeHash: string;
  amount: number;
}

export const TradeAdvancedInfo = ({
  avatar,
  buyerPosReputation,
  buyerNegReputation,
  buyerNumberOfTrades,
  tradeIsPaid,
  tradeHash,
  amount,
}: ITradeAdvancedInfoProps) => {
  const btcRate = useSelector(btcRateSelector);
  const amountBTC = useMemo(() => calculateAmountBTC(amount, btcRate), [
    amount,
    btcRate,
  ]);

  return (
    <div className="trade-details__info">
      <div className="trade-details__info-row">
        <div className="trade-details__info-buyer">
          <Avatar avatar={avatar} />
          <div className="trade-details__info-buyer-reputation">
            <span className="trade-details__info-buyer-pos-reputation">
              +{buyerPosReputation}
            </span>
            /
            <span className="trade-details__info-buyer-neg-reputation">
              -{buyerNegReputation}
            </span>
          </div>
        </div>
        <div className="trade-details__num-trades">
          <div className="trade-details__label"># of trades</div>
          <div className="trade-details__num-trades-value">
            {buyerNumberOfTrades}
          </div>
        </div>
      </div>
      <div className="trade-details__info-row">
        <div className="trade-details__status">
          <div className="trade-details__label">Trade Status</div>
          <div className="trade-details__status-info">
            {tradeIsPaid ? (
              <span className="paid">Paid</span>
            ) : (
              <span className="nopaid">Not Paid</span>
            )}
          </div>
        </div>
        <div className="trade-details__hash">
          <div className="trade-details__label">Trade hash</div>
          <div className="trade-details__hash-value">{tradeHash}</div>
        </div>
      </div>
      <div className="trade-details__info-row">
        <div className="trade-details__amount-usd">
          <div className="trade-details__label">Amount USD</div>
          <div className="trade-details__amount-value">{amount}</div>
        </div>
        <div className="trade-details__amount-btc">
          <div className="trade-details__label">Amount BTC</div>
          <div className="trade-details__amount-value">{amountBTC}</div>
        </div>
      </div>
    </div>
  );
};
