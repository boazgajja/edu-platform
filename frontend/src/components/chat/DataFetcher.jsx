import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/practice1/PHP/chats.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setData(data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className='box'>
      {data.map(item => (
        <div className="chatname" key={item.unique_id}>
          {item.unique_id}
        </div>
      ))}
    </div>
  );
};

export default DataFetcher;


// import React from 'react';
// import axios from 'axios';

// class ClickableDivision extends React.Component {
//   handleClick = () => {
//     const clickedText = this.div.textContent; // Get text content of the clicked division
    
//     // Assuming you have the user name stored in state or props
//     const userName = "hi this "; // Replace with actual user name
    
    // Send AJAX request with clicked text and user name
//     axios.post('PHP/handle_click.php', { clickedText, userName })
//       .then(response => {
//         console.log(response.data); // Log response from server
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   render() {
//     return (
//       <div
//         ref={div => this.div = div} // Store a reference to the division
//         onClick={this.handleClick}
//         style={{ cursor: 'pointer' }}
//       >
//         Click me!
//       </div>
//     );
//   }
// }

// export default ClickableDivision;



// for after clicking 
// import React from 'react';

// class DataFetcher extends React.Component {
//   handleClick = () => {
//     const userName = "hi this "; 
//     const clickedText = "hi ho"; 
    
//     fetch('http://localhost/practice1/PHP/handle_click.php', {
//       method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ clickedText: clickedText, userName: userName }),
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.text(); // assuming response is text
// })
// .then(data => {
//   console.log('Response: hi ', data); // Output the response from the server
// })
// .catch(error => {
//   console.error('Error:', error);
// });
//   };

//   render() {
//     return (
//       <div
      
//         onClick={this.handleClick}
//         style={{ cursor: 'pointer' }}
//       >
//         Click me!
//       </div>
//     );
//   }
// }

// export default DataFetcher;
