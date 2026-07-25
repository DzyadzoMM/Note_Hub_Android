// hooks/useNotes.ts
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../services/apiClient";
import { deleteNote, postNotes } from "../services/notesApi";
import { getMy } from "../services/userApi";

export function useNotes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const fetchNotes = async () => {
    try {
      const cookies = await SecureStore.getItemAsync("userCookies");
      if (!cookies)
        throw new Error("Куки відсутні. Користувач не авторизований.");

      const response = await fetch(`${API_URL}/notes`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Cookie: cookies },
      });

      const responseData = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(
          responseData?.message || "Не вдалося завантажити нотатки",
        );

      // ЗАХИСТ: якщо бекенд повертає масив напряму або об'єкт { notes: [...] }
      const notesArray = Array.isArray(responseData)
        ? responseData
        : responseData?.notes || [];

      setNotes(notesArray);
      setTotalNotes(responseData?.totalNotes ?? notesArray.length);
    } catch (error: any) {
      console.error("Помилка GET /notes:", error);
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      const userData = await getMy();
      setUser(userData);
    } catch (err: any) {
      console.error("Помилка завантаження профілю:", err);
    }
  };

  const loadAllData = async () => {
    try {
      await Promise.all([fetchNotes(), loadUserData()]);
    } catch (err: any) {
      Alert.alert("Помилка", err.message || "Не вдалося оновити дані");
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadAllData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoadingNotes(true);
      await loadAllData();
      setIsLoadingNotes(false);
    };
    init();
  }, []);

  const handleCreateNote = async (
    values: { title: string; content: string; tag: string },
    { resetForm, setSubmitting }: any,
  ) => {
    try {
      const formattedValues = {
        ...values,
        tag:
          values.tag.charAt(0).toUpperCase() +
          values.tag.slice(1).toLowerCase(),
      };

      await postNotes(formattedValues);
      resetForm();
      setModalVisible(false);
      await fetchNotes();
    } catch (error: any) {
      console.error("Помилка створення нотатки:", error);
      Alert.alert("Помилка", error.message || "Не вдалося створити нотатку");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    Alert.alert("Видалення", "Ви дійсно хочете видалити цю нотатку?", [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(id);
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note._id !== id),
            );
            setTotalNotes((prev) => Math.max(0, prev - 1));
          } catch (error: any) {
            console.error("Помилка видалення:", error);
            Alert.alert(
              "Помилка",
              error.message || "Не вдалося видалити нотатку",
            );
          }
        },
      },
    ]);
  };

  return {
    modalVisible,
    setModalVisible,
    isLoadingNotes,
    isRefreshing,
    notes,
    totalNotes,
    user,
    search,
    setSearch,
    activeTag,
    setActiveTag,
    onRefresh,
    handleCreateNote,
    handleDeleteNote,
  };
}
