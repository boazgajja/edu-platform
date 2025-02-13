const API_URL = "http://localhost:5000/api";

// Fetch users
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};


// Create new user
export const createUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};
