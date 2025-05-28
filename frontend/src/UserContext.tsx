// src/UserContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

// Define your User type (customize as needed)
export type User = {
  email: string;
  id: string;
  // add more fields if needed
};

// Define context shape
type UserContextType = {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

// Create the actual context (default value is undefined)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Exported Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // On mount, try to fetch user from backend
  useEffect(() => {
    fetch("/auth/me", { credentials: "include" })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy consumption (recommended)
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}

// Also export context for advanced use
export { UserContext };
