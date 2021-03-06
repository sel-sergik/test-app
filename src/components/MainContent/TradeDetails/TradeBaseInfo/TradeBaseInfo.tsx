import React from 'react';

import './TradeBaseInfo.scss';

interface ITradeDetailsProps {
  name: string | undefined;
  buttonClick: () => void;
  tradeIsPaid: boolean | undefined;
}

export const TradeBaseInfo = React.memo(({
  name,
  buttonClick,
  tradeIsPaid,
}: ITradeDetailsProps) => {
  return (
    <>
      <div className="trade-details__trade-with">
        <span>You are trading with </span>
        <span className="trade-details__buyer-name">{name}</span>
      </div>
      <div className="trade-details__start-time">started 23 minutes ago</div>
      <button
        type="button"
        className="trade-details__paid-button"
        onClick={buttonClick}
        disabled={tradeIsPaid}
      >
        Release bitcoins
      </button>
    </>
  );
});
