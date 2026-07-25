// services/apiClient.ts
import * as SecureStore from "expo-secure-store";

export const API_URL = "https://notehub-back.onrender.com";

// Функція оновлення сесії (refresh token)
async function refreshSession(): Promise<boolean> {
  try {
    const cookies = await SecureStore.getItemAsync("userCookies");

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookies ? { Cookie: cookies } : {}),
      },
    });

    if (!response.ok) {
      return false;
    }

    const rawCookies = response.headers.get("set-cookie");
    if (rawCookies) {
      const cleanCookies = rawCookies
        .split(/,(?=\s*\w+=)/)
        .map((cookieStr) => cookieStr.split(";")[0].trim())
        .join("; ");
      await SecureStore.setItemAsync("userCookies", cleanCookies);
    }

    return true;
  } catch (error) {
    console.error("Помилка оновлення сесії:", error);
    return false;
  }
}

// Загальна обгортка для запитів з автоматичним рефрешем при 401
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const cookies = await SecureStore.getItemAsync("userCookies");
  if (!cookies) {
    throw new Error("Куки відсутні. Користувач не авторизований.");
  }

  const makeRequest = async (currentCookies: string) => {
    const isFormData = options.body instanceof FormData;

    const headers = {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...options.headers,
      Cookie: currentCookies,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(cookies);

  if (response.status === 401) {
    const refreshed = await refreshSession();
    if (refreshed) {
      const newCookies = await SecureStore.getItemAsync("userCookies");
      if (newCookies) {
        response = await makeRequest(newCookies);
      }
    } else {
      await SecureStore.deleteItemAsync("userCookies");
      throw new Error("Сесія закінчилася. Будь ласка, увійдіть знову.");
    }
  }

  return response;
}
