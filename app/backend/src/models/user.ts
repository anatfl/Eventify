// backend/src/models/user.ts

export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
  }
  
  // In-memory store
  export const users = new Map<string, User>();
  