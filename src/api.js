// src/api.js
const users = [
    { id: 1, email: 'test@example.com', password: 'password' },
    // Add more mock user data here if needed
  ];
  
  const api = {
    login: (email, password) => {
      return new Promise((resolve, reject) => {
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      });
    },
    signup: (email, password) => {
      return new Promise((resolve, reject) => {
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          reject(new Error('Email already exists'));
        } else {
          const newUser = { id: users.length + 1, email, password };
          users.push(newUser);
          resolve(newUser);
        }
      });
    },
  };
  
  export default api;
  