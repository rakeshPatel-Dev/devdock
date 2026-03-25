// src/auth.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001/api/auth",
});


async function testSignup() {
  await authClient.signUp.email({
    email: "test@gmail.com",
    password: "123456",
    name: "Test User",
  });
}

async function testLogin() {
  await authClient.signIn.email({
    email: "test@gmail.com",
    password: "123456",
  });
}

async function testGoogle() {
  await authClient.signIn.social({
    provider: "google",
  });
}

export { testSignup, testLogin, testGoogle };
