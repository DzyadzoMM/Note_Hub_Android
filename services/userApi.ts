// services/userApi.ts
import { API_URL, authenticatedFetch } from "./apiClient";

export async function getMy() {
  const response = await authenticatedFetch(`${API_URL}/users/me`, {
    method: "GET",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Не вдалося завантажити дані користувача");
  }

  return data;
}

export async function updateUserAvatar(fileUri: string) {
  const formData = new FormData();

  const filename = fileUri.split("/").pop() || "avatar.jpg";
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image/jpeg`;

  formData.append("avatar", {
    uri: fileUri,
    name: filename,
    type,
  } as any);

  const response = await authenticatedFetch(`${API_URL}/users/me/avatar`, {
    method: "PATCH",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Не вдалося оновити аватарку");
  }

  return data;
}
