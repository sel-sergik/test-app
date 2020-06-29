import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeTradeIdSelector, tradeChatsSelector } from 'selectors';
import { removeTradeAction, setActiveTradeAction } from 'actions';
import { findTradebyId, isSeller } from 'services';
import { IMessage } from 'interfaces';
import { ChatMessage, ChatHeader, MessageForm } from 'components';
import './Chat.scss';

export const Chat: React.FC<{ currentUserId: number; }> = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const activeTradeId = useSelector(activeTradeIdSelector);
  const tradeChats = useSelector(tradeChatsSelector);
  const currentChat = tradeChats.find(chat => chat.tradeId === activeTradeId);
  const currentChatMessages = currentChat?.messages;
  const isUserSeller = isSeller(currentUserId);
  const relatedTrade = activeTradeId ? findTradebyId(activeTradeId) : null;
  const interlocutorName = isUserSeller ? relatedTrade?.buyer.name : relatedTrade?.seller.name;

  const removeTradeHandler = () => {
    dispatch(removeTradeAction(activeTradeId));
    dispatch(setActiveTradeAction(null));
  }

  return (
    <>
      {activeTradeId ? 
        <div className='chat'>
          <ChatHeader
            paymentMethod={relatedTrade?.paymentMethod as string}
            interlocutorName={interlocutorName as string}
            removeTradeHandler={removeTradeHandler}
          />
          <div className='chat-messages-list'>
            { currentChatMessages?.map((message: IMessage, index: number) => {
              const avatar = message.userId === relatedTrade?.seller.id ? relatedTrade?.seller.avatar : relatedTrade?.buyer.avatar;
              
              return <ChatMessage 
                key={`message-${index}`}
                currentUserId={currentUserId}
                avatar={avatar as string}
                {...message}/>
              }
            )}
          </div>
          <MessageForm tradeId={activeTradeId} currentUserId={currentUserId}/>
        </div> 
        : null
      }
    </>
  );
};
