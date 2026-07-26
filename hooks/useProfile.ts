import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import { API_URL } from "../services/apiClient";
import { getMy, updateUserAvatar } from "../services/userApi";

const rnBiometrics = new ReactNativeBiometrics();

export function useProfile() {
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Додаємо стани для біометрії
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true);

        // Перевірка підтримки біометрії та завантаження налаштування
        const { available } = await rnBiometrics.isSensorAvailable();
        setIsBiometricSupported(available);

        const savedBiometricPref =
          await SecureStore.getItemAsync("biometric_enabled");
        if (savedBiometricPref === "true") {
          setIsBiometricEnabled(true);
        }

        const userData = await getMy();
        setUser(userData);

        const cookies = await SecureStore.getItemAsync("userCookies");
        if (cookies) {
          const response = await fetch(`${API_URL}/notes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: cookies,
            },
          });
          const responseData = await response.json().catch(() => null);
          if (response.ok && responseData?.notes) {
            setNotes(responseData.notes);
          }
        }
      } catch (err: any) {
        console.error("Помилка завантаження даних профілю:", err);
        Alert.alert("Помилка", err.message || "Не вдалося завантажити профіль");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // Функція перемикання біометрії
  const toggleBiometric = async (value: boolean) => {
    if (value) {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) {
        Alert.alert(
          "Помилка",
          "Біометричний сенсор недоступний на цьому пристрої",
        );
        return;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: "Підтвердіть особу для увімкнення біометрії",
      });

      if (success) {
        setIsBiometricEnabled(true);
        await SecureStore.setItemAsync("biometric_enabled", "true");
        Alert.alert("Успіх", "Вхід за біометрією увімкнено");
      }
    } else {
      setIsBiometricEnabled(false);
      await SecureStore.setItemAsync("biometric_enabled", "false");
    }
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Помилка", "Потрібен дозвіл на доступ до галереї!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      try {
        setIsUploading(true);
        const response = await updateUserAvatar(result.assets[0].uri);
        setUser((prev: any) => ({ ...prev, avatar: response.url }));
        Alert.alert("Успіх", "Аватарку успішно оновлено!");
      } catch (error: any) {
        console.error("Помилка завантаження аватара:", error);
        Alert.alert(
          "Помилка",
          error.message || "Не вдалося завантажити аватарку",
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userCookies");
      await SecureStore.deleteItemAsync("biometric_enabled");
      router.replace("/");
    } catch (error) {
      console.error("Помилка при логауті:", error);
      Alert.alert("Помилка", "Не вдалося вийти з аккаунта");
    }
  };

  const totalWords = notes
    .reduce((a, n) => a + (n.content?.split(/\s+/)?.length || 0), 0)
    .toLocaleString();

  const uniqueTagsCount = [...new Set(notes.map((n) => n.tag))].length;

  return {
    user,
    isLoading,
    isUploading,
    isBiometricEnabled,
    isBiometricSupported,
    toggleBiometric,
    stats: {
      notesCount: notes.length,
      totalWords,
      uniqueTagsCount,
    },
    handlePickImage,
    handleLogout,
  };
}
