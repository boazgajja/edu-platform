// UserDetails.js

import React from 'react';

function UserDetails() {
  return (
    <div id="top1">
      <div className="image"></div>
      <div id="top">
        <div id="name" style={{ fontSize: '20px', margin: '5px' }}>
          {/* Render user's name here */}
        </div>
        <div id="active" style={{ fontSize: '15px', marginLeft: '5px' }}>
          {/* Render user's activity status here */}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
