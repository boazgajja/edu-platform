import React from 'react';

export const ChatMessage = ({
  message,
  isCurrentUser,
}) => {
  return (
    <div className={`message ${isCurrentUser ? 'outgoing' : 'incoming'}`}>
      {!isCurrentUser && (
        <img src={message.senderAvatar} alt={message.senderName} className="avatar" />
      )}
      <div className="message-content">
        <div className="message-bubble">
          {message.text}
        </div>
        <span className="message-timestamp">{message.timestamp}</span>
      </div>
      {isCurrentUser && (
        <img src={message.senderAvatar} alt={message.senderName} className="avatar" />
      )}
    </div>
  );
};