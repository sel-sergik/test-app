export interface ITradeDetails {
  tradeId: number;
  buyerId: number;
  buyerPosReputation: number;
  buyerNegReputation: number;
  buyerNumberOfTrades: number;
  tradeHash: string;
  paymentMethod: string;
  amount: number;
}
