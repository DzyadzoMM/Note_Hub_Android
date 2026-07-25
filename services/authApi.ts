// services/authApi.ts
import * as SecureStore from "expo-secure-store";
import { API_URL } from "./apiClient";

async function handleAuthResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Помилка запиту");

  const rawCookies = response.headers.get("set-cookie");
  if (rawCookies) {
    const cleanCookies = rawCookies
      .split(/,(?=\s*\w+=)/)
      .map((cookieStr) => cookieStr.split(";")[0].trim())
      .join("; ");
    await SecureStore.setItemAsync("userCookies", cleanCookies);
  }

  return data;
}

export async function loginUser(values: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return handleAuthResponse(response);
}

export async function registerUser(values: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return handleAuthResponse(response);
}
