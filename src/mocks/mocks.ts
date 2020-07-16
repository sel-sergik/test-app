import { UserRoles } from '@interfaces/UserRoles';
import { PaymentMethods } from '@interfaces/PaymentMethods';

export const USERS = [
  {
    id: 1,
    name: 'Chanaar',
    avatar: 'avatar1.png',
    email: 'chaanar@gmail.com',
    password: '1234',
    role: UserRoles.BUYER,
  },
  {
    id: 2,
    name: 'Alex',
    avatar: 'avatar2.jpg',
    email: 'alex@gmail.com',
    password: '2345',
    role: UserRoles.BUYER,
  },
  {
    id: 3,
    name: 'Ivan',
    avatar: 'avatar_placeholder.jpg',
    email: 'ivan@gmail.com',
    password: '3456',
    role: UserRoles.BUYER,
  },
  {
    id: 4,
    name: 'Seller',
    avatar: 'seller_avatar.png',
    email: 'seller@gmail.com',
    password: '4567',
    role: UserRoles.SELLER,
  },
];

export const TRADES = [
  {
    id: 1,
    buyer: {
      id: 1,
      name: 'Chanaar',
      avatar: 'avatar1.png',
    },
    seller: {
      id: 4,
      name: 'Seller',
      avatar: 'seller_avatar.png',
    },
    paymentMethod: PaymentMethods.AMAZON,
    amount: 77,
    isPaid: true
  },
  {
    id: 2,
    buyer: {
      id: 1,
      name: 'Chanaar',
      avatar: 'avatar1.png',
    },
    seller: {
      id: 4,
      name: 'Seller',
      avatar: 'seller_avatar.png',
    },
    paymentMethod: PaymentMethods.ITUNES,
    amount: 30,
    isPaid: false
  },
  {
    id: 3,
    buyer: {
      id: 2,
      name: 'Alex',
      avatar: 'avatar2.jpg',
    },
    seller: {
      id: 4,
      name: 'Seller',
      avatar: 'seller_avatar.png',
    },
    paymentMethod: PaymentMethods.ITUNES,
    amount: 45,
    isPaid: true
  },
  {
    id: 4,
    buyer: {
      id: 3,
      name: 'Ivan',
      avatar: 'avatar_placeholder.jpg',
    },
    seller: {
      id: 4,
      name: 'Seller',
      avatar: 'seller_avatar.png',
    },
    paymentMethod: PaymentMethods.PAYPAL,
    amount: 12,
    isPaid: false
  },
];

export const TRADES_DETAILS = [
  {
    tradeId: 1,
    buyerId: 1,
    buyerPosReputation: 37,
    buyerNegReputation: 1,
    buyerNumberOfTrades: 4,
    tradeHash: '45aFD3Rr',
    paymentMethod: 'Amazon',
    amount: 77,
  },
  {
    tradeId: 2,
    buyerId: 1,
    buyerPosReputation: 37,
    buyerNegReputation: 1,
    buyerNumberOfTrades: 4,
    tradeHash: '1r5aFd3Rr',
    paymentMethod: 'iTunes',
    amount: 30,
  },
  {
    tradeId: 3,
    buyerId: 2,
    buyerPosReputation: 15,
    buyerNegReputation: 3,
    buyerNumberOfTrades: 12,
    tradeHash: '235apQ3RT',
    paymentMethod: 'iTunes',
    amount: 45,
  },
  {
    tradeId: 4,
    buyerId: 3,
    buyerPosReputation: 25,
    buyerNegReputation: 5,
    buyerNumberOfTrades: 8,
    tradeHash: '2RT5vQ3aQ',
    paymentMethod: 'PayPal',
    amount: 12,
  },
];

export const TRADE_CHATS = [
  {
    tradeId: 1,
    messages: [
      {
        userId: 1,
        message: 'asdfagffsd asfasfa asdasdfa asdasfaf',
        time: '2020-06-20T16:22:34Z',
        isRead: true,
      },
      {
        userId: 4,
        message: 'asdfagffsd asfasfa asdasdfa asdasfaf',
        time: '2020-06-20T17:00:00Z',
        isRead: true,
      },
      {
        userId: 1,
        message: 'asdfagffsd asfasfa asdasdfa asdasfaf',
        time: '2020-06-21T10:00:04Z',
        isRead: false,
      },
    ],
  },
  {
    tradeId: 2,
    messages: [
      {
        userId: 1,
        message: 'Hi hi hi',
        time: '2020-06-18T14:56:12Z',
        isRead: true,
      },
      {
        userId: 4,
        message: 'tra ta ta',
        time: '2020-06-18T15:16:00Z',
        isRead: true,
      },
    ],
  },
  {
    tradeId: 3,
    messages: [
      {
        userId: 2,
        message: 'asfwefcc wewrwrr ddd',
        time: '2020-06-23T09:34:43Z',
        isRead: true,
      },
      {
        userId: 4,
        message: 'asfwefw wf wefwetwe wrqwr wewetwet tra ta ta',
        time: '2020-06-23T16:45:00Z',
        isRead: true,
      },
    ],
  },
  {
    tradeId: 4,
    messages: [],
  },
];
