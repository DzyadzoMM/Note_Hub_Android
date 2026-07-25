// services/notesApi.ts
import { API_URL, authenticatedFetch } from "./apiClient";

export async function fetchNotes() {
  const response = await authenticatedFetch(`${API_URL}/notes`, {
    method: "GET",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Не вдалося завантажити нотатки");
  }

  return data;
}

export async function postNotes(values: {
  title: string;
  content: string;
  tag: string;
}) {
  const response = await authenticatedFetch(`${API_URL}/notes`, {
    method: "POST",
    body: JSON.stringify(values),
  });

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(responseData?.message || "Помилка при створенні нотатки");
  }

  return responseData;
}

export async function deleteNote(id: string) {
  const response = await authenticatedFetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "Не вдалося видалити нотатку");
  }

  return true;
}
