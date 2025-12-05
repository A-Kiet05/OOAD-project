// src/api/mockAuth.js

const DEFAULT_USERS = [
  {
    id: 1,
    fullName: "Kiệt Lặc",
    email: "kiet@gmail.com",
    password: "kietlac123",
  },
  {
    id: 2,
    fullName: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
  }
];

// Khởi tạo user vào localStorage nếu chưa có
export function initMockUsers() {
  try {
    const existingRaw = localStorage.getItem("mockUsers");
    if (!existingRaw) {
      localStorage.setItem("mockUsers", JSON.stringify(DEFAULT_USERS));
      return;
    }

    // Merge any missing default users (by email) into existing mockUsers
    const existing = JSON.parse(existingRaw) || [];
    const emails = new Set(existing.map((u) => u.email));
    let changed = false;
    for (const def of DEFAULT_USERS) {
      if (!emails.has(def.email)) {
        existing.push(def);
        changed = true;
      }
    }
    if (changed) localStorage.setItem("mockUsers", JSON.stringify(existing));
  } catch (e) {
    // If parsing failed, reset to defaults
    localStorage.setItem("mockUsers", JSON.stringify(DEFAULT_USERS));
  }
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) return reject("Wrong email or password :(");

      resolve({ id: user.id, email: user.email, fullName: user.fullName });
    }, 600);
  });
}

export function signup(fullName, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

      if (users.find((u) => u.email === email)) {
        return reject("Email already exists :(");
      }

      const newUser = {
        id: Date.now(),
        fullName,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem("mockUsers", JSON.stringify(users));

      resolve(newUser);
    }, 600);
  });
}
