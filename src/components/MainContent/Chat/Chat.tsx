import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  activeTradeIdSelector,
  relatedTradeSelector,
  chatReadMessagesSelector,
  chatUnreadMessagesSelector,
  interlocutorNameSelector,
} from '@selectors/tradesSelectors';

import {
  removeTradeAction,
  setActiveTradeAction,
  markMessagesAction,
} from '@store/actions/tradesActions';

import { IMessage } from '@interfaces/IMessage';
import { IUser } from '@interfaces/IUser';
import { PaymentMethods } from '@interfaces/PaymentMethods';

import { ChatMessage } from '@components/MainContent/Chat/ChatMessage/ChatMessage';
import { ChatHeader } from '@components/MainContent/Chat/ChatHeader/ChatHeader';
import { MessageForm } from '@components/MainContent/Chat/MessageForm/MessageForm';

import './Chat.scss';

interface IChatProps {
  currentUserId: number;
}

const Chat = ({ currentUserId }: IChatProps) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const activeTradeId: number = useSelector(activeTradeIdSelector);
  const readMessages = useSelector(
    chatReadMessagesSelector(activeTradeId, currentUserId)
  );
  const unReadMessages = useSelector(
    chatUnreadMessagesSelector(activeTradeId, currentUserId)
  );
  const relatedTrade = useSelector(relatedTradeSelector(activeTradeId));
  const interlocutorName = useSelector(
    interlocutorNameSelector(currentUserId, activeTradeId)
  );
  const seller = relatedTrade?.seller as IUser;
  const buyer = relatedTrade?.buyer as IUser;
  const interlocutorId = seller?.id === currentUserId ? buyer?.id : seller?.id;

  const removeTradeHandler = useCallback(() => {
    dispatch(removeTradeAction(activeTradeId));
    dispatch(setActiveTradeAction(null));
  }, [activeTradeId, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const showMessages = (messages: Array<IMessage>) =>
    messages?.map((message, index) => {
      return (
        <ChatMessage
          key={`message-${index}`}
          currentUserId={currentUserId}
          seller={seller}
          buyer={buyer}
          {...message}
        />
      );
    });

  useEffect(() => {
    activeTradeId &&
      setTimeout(
        () =>
          dispatch(
            markMessagesAction({ currentUserId, tradeId: activeTradeId })
          ),
        3000
      );
  }, [activeTradeId, currentUserId, dispatch]);

  useEffect(scrollToBottom, [readMessages?.length, unReadMessages?.length]);

  return (
    <>
      {activeTradeId && relatedTrade ? (
        <div className="chat">
          <ChatHeader
            paymentMethod={relatedTrade?.paymentMethod as PaymentMethods}
            interlocutorName={interlocutorName as string}
            removeTradeHandler={removeTradeHandler}
          />
          <div className="chat-messages-list">
            <div className="chat-messages-wrapper">
              {showMessages(readMessages as IMessage[])}
              {(unReadMessages as IMessage[]).length ? (
                <>
                  <div className="unread-separator">
                    <span>New messages</span>
                  </div>
                  {showMessages(unReadMessages as IMessage[])}
                </>
              ) : null}
            </div>
            <div ref={messagesEndRef} />
          </div>
          <MessageForm
            tradeId={activeTradeId}
            currentUserId={currentUserId}
            interlocutorId={interlocutorId}
          />
        </div>
      ) : (
        activeTradeId &&
        !relatedTrade && <div>Trade with provided ID hasn't been found</div>
      )}
    </>
  );
};

export const MemoizedChat = React.memo(Chat);
