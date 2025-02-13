const API_URL = "http://localhost:5000/api/auth";

// Register user with image
export const registerUser = async (fullname, username, email, password, age, image) => {
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("age", age);
    formData.append("image", image);

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: formData,
    });
    return response.json();
};

// Login user
export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};
