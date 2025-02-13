import React, { useEffect, useState } from "react";
import { fetchUsers, createUser } from "./services/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/logup/navbar";
import Home from "./components/home/home";
import Chat from "./components/chat/main";
import Exam from "./components/exam/courses";
import Contribute from "./components/exam/contribute";
import Noof from "./components/exam/questions";
import Compute from "./components/compete";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch users from the database
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  // Handle user registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser(name, email, password);
    if (newUser) {
      setUsers([...users, newUser.user]);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Router>
      <Login />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contributed" element={<Compute />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/exam/quiz" element={<Noof />} />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>

      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name} - {user.email}</li>
          ))}
        </ul>

        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Create User</button>
        </form>
      </div>
    </Router>
  );
};

export default App;
