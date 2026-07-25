// app/index.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FormAuth } from "../components/auth/FormAuth";
import { loginUser, registerUser } from "../services/authApi";

export default function AuthScreen() {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const router = useRouter();
  const isLogin = authMode === "login";

  const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (isLogin) {
        await loginUser(values);
      } else {
        await registerUser(values);
      }

      router.replace("/notes");
    } catch (error: any) {
      console.error("Помилка запиту:", error);
      Alert.alert("Помилка", error.message || "Щось пішло не так");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 40,
      }}
      className="flex-1 bg-slate-50"
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <View className="flex-row items-center mb-6">
          <Image
            source={require("@/assets/images/icon.png")}
            className="w-14 h-14"
          />
          <Text className="pl-2 font-fraunces text-3xl text-neutral-900">
            Note Hub
          </Text>
        </View>

        <View>
          <Text className="font-fraunces-bold text-4xl text-black">
            {isLogin ? "Ласкаво просимо" : "Створити акаунт"}
          </Text>
          <Text className="font-fraunces text-lg text-gray-500 mt-1">
            {isLogin
              ? "Авторизуйтесь, щоб бачити нотатки"
              : "Зареєструйтеся, щоб почати"}
          </Text>
        </View>

        <View className="flex-row w-full h-14 mt-8 p-1 bg-gray-200 rounded-xl">
          <TouchableOpacity
            onPress={() => setAuthMode("login")}
            style={isLogin ? { backgroundColor: "#ffffff" } : {}}
            className="flex-1 items-center justify-center rounded-lg"
          >
            <Text
              className={`font-roboto-bold text-base ${
                isLogin ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Вхід
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAuthMode("register")}
            style={!isLogin ? { backgroundColor: "#ffffff" } : {}}
            className="flex-1 items-center justify-center rounded-lg"
          >
            <Text
              className={`font-roboto-bold text-base ${
                !isLogin ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Реєстрація
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-2">
          <FormAuth mode={authMode} onSubmit={handleFormSubmit} />
        </View>
      </View>

      <View className="flex-row justify-center items-center gap-1 mt-10">
        <Text className="font-fraunces text-sm text-gray-500">
          {isLogin ? "Немає облікового запису?" : "Вже є обліковий запис?"}
        </Text>
        <TouchableOpacity
          onPress={() => setAuthMode(isLogin ? "register" : "login")}
        >
          <Text className="font-fraunces text-sm text-teal-600 font-bold">
            {isLogin ? "Зареєструватися" : "Увійти"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
