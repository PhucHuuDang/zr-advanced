import { User } from "../../types/user.types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const userApi = {
  async fetchUser(): Promise<User[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    if (!id || !user) throw new Error("Invalid values");

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        ...user,
      }),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  async addUser(user: User): Promise<User> {
    if (!user) throw new Error("Invalid values");

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  },

  async deleteUser(id: number): Promise<void> {
    if (!id) throw new Error("Invalid values");

    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete user");
  },
};
