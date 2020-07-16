import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { animateScroll } from "react-scroll";

import { activeTradeIdSelector, relatedTradeSelector, chatReadMessagesSelector, chatUnreadMessagesSelector, interlocutorNameSelector } from '@selectors/tradesSelectors';

import { removeTradeAction, setActiveTradeAction, markMessagesAction } from '@store/actions/tradesActions';

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

const Chat = ({
  currentUserId
}: IChatProps) => {
  const dispatch = useDispatch();
  const activeTradeId: number = useSelector(activeTradeIdSelector);
  const readMessages = useSelector(
    chatReadMessagesSelector(activeTradeId, currentUserId)
  );
  const unReadMessages = 
    useSelector(chatUnreadMessagesSelector(activeTradeId, currentUserId));
  const relatedTrade = useSelector(relatedTradeSelector(activeTradeId));
  const interlocutorName = 
    useSelector(interlocutorNameSelector(currentUserId, activeTradeId));

  const removeTradeHandler = useCallback(
    () => {
      dispatch(removeTradeAction(activeTradeId));
      dispatch(setActiveTradeAction(null));
    },
    [activeTradeId],
  );

  const  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'scroll-container'
    });
  };

  const showMessages = (messages: Array<IMessage>) =>
    messages?.map((message, index) => {
      return (
        <ChatMessage
          key={`message-${index}`}
          currentUserId={currentUserId}
          seller={relatedTrade?.seller as IUser}
          buyer={relatedTrade?.buyer as IUser}
          {...message}
        />
      );
    });

  useEffect(() => {
    activeTradeId && setTimeout(() => dispatch(
      markMessagesAction({ currentUserId, tradeId: activeTradeId })
    ), 3000);
  }, [activeTradeId, currentUserId]);

  useEffect(scrollToBottom, [readMessages?.length]);

  return (
    <>
      {activeTradeId && (
        <div className="chat">
          <ChatHeader
            paymentMethod={relatedTrade?.paymentMethod as PaymentMethods}
            interlocutorName={interlocutorName as string}
            removeTradeHandler={removeTradeHandler}
          />
          <div className="chat-messages-list">
            <div id="scroll-container" className="chat-messages-wrapper"> 
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
          </div>
          <MessageForm tradeId={activeTradeId} currentUserId={currentUserId} />
        </div>
      )}
    </>
  );
};

export const MemoizedChat = React.memo(Chat);