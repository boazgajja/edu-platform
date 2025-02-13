// Header.js

import React from 'react';

function Header() {
  return (
    <div className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Messages</h2>
        <div id="add"></div>
      </div>
      <input type="text" placeholder="search for the chat" />
    </div>
  );
}

export default Header;
