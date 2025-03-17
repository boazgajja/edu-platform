
import React, { useState } from 'react';
import { ContactList } from './ContactList';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageCircle } from 'lucide-react';
import "./chat.css";


import { useEffect } from "react";

// const MyComponent = () => {
  
//   return <div>Welcome to My Page</div>;
// };



// Mock current user
const currentUser = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  status: 'Online',
  unreadCount: 0,
};

// Mock contacts
const mockContacts = [
  {
    id: '2',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'Online',
    unreadCount: 2,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'Last seen 2h ago',
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'Online',
    unreadCount: 1,
  },
];

// Mock messages
const mockMessages = {
  '2': [
    {
      id: '1',
      text: "Hi! I have a question about today's lesson.",
      senderId: '2',
      senderName: 'Sarah Wilson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      timestamp: '10:00 AM',
      read: true,
    },
    {
      id: '2',
      text: "Of course! What would you like to know?",
      senderId: '1',
      senderName: 'John Doe',
      senderAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      timestamp: '10:02 AM',
      read: true,
    },
  ],
};

function App() {
  useEffect(() => {
    console.log("Page Loaded!"); // Function runs when component mounts
    fetchUserData();
  }, []); // Empty dependency array = runs only once when the component loads

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat");
      const data = await response.json();
      console.log("User Data:", data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };



  
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [contacts, setContacts] = useState(mockContacts);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriend, setNewFriend] = useState({ name: '', email: '' });

  const handleSelectContact = (userId) => {
    setSelectedUserId(userId);
    const updatedContacts = contacts.map(contact => 
      contact.id === userId ? { ...contact, unreadCount: 0 } : contact
    );
    setContacts(updatedContacts);
  };

  const handleSendMessage = (text) => {
    if (!selectedUserId) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
    }));
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now().toString(),
      name: newFriend.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      status: 'Offline',
      unreadCount: 0,
    };
    setContacts([...contacts, newContact]);
    setNewFriend({ name: '', email: '' });
    setShowAddFriend(false);
  };

  const selectedContact = contacts.find(contact => contact.id === selectedUserId);
  const currentChat = selectedUserId ? messages[selectedUserId] || [] : [];

  return (
    <div className="flex h-screen">
      <div className="sidebar">
        <ContactList
          contacts={contacts}
          selectedUserId={selectedUserId}
          onSelectContact={handleSelectContact}
        />
        <div className="border-t mt-auto">
          {showAddFriend ? (
            <div className="add-friend-form">
              <form onSubmit={handleAddFriend}>
                <input
                  type="text"
                  placeholder="Friend's name"
                  value={newFriend.name}
                  onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Friend's email"
                  value={newFriend.email}
                  onChange={(e) => setNewFriend({ ...newFriend, email: e.target.value })}
                  className="form-input"
                  required
                />
                <div className="button-group">
                  <button type="submit" className="button button-primary">
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddFriend(false)}
                    className="button button-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowAddFriend(true)}
              className="add-friend-button"
            >
              <span className="text-2xl">+</span> Add Friend
            </button>
          )}
        </div>
      </div>
      <div className="chat-area">
        {selectedContact ? (
          <>
            <div className="chat-header">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="avatar"
              />
              <div>
                <h2 className="font-semibold">{selectedContact.name}</h2>
                <p className="text-sm opacity-90">{selectedContact.status}</p>
              </div>
            </div>
            <div className="chat-messages">
              {currentChat.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === currentUser.id}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>Select a contact to start chatting</p>
            </div>
          </div>
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!selectedUserId}
        />
      </div>
    </div>
  );
}

export default App;