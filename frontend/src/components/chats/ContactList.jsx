import React from 'react';

export const ContactList = ({
  contacts,
  selectedUserId,
  onSelectContact,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="contacts-header">
        <h1>Contacts</h1>
      </div>
      <div className="contacts-list">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
            className={`contact-button ${selectedUserId === contact.id ? 'selected' : ''}`}
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="avatar"
            />
            <div className="contact-info">
              <h3 className="contact-name">{contact.name}</h3>
              <p className="contact-status">{contact.status}</p>
            </div>
            {contact.unreadCount > 0 && (
              <span className="unread-badge">
                {contact.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};