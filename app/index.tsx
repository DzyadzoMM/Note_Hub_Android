import { images } from "@/constants/images";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AuthScreen() {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const isLogin = authMode === "login";

  return (
    <View className="flex-1 px-8 bg-slate-50 py-12 justify-between relative">
      <View>
        <View className="flex-row items-center mb-6">
          <Image source={images.icon} className="w-14 h-14" />
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
              : "Зареєстрайтеся, щоб почати"}
          </Text>
        </View>
        <View className="flex-row w-full h-14 mt-8 p-1 bg-gray-200 rounded-xl">
          <TouchableOpacity
            onPress={() => setAuthMode("login")}
            style={isLogin ? { backgroundColor: "#ffffff" } : {}}
            className="flex-1 items-center justify-center rounded-lg"
          >
            <Text
              className={`font-roboto-bold text-base ${isLogin ? "text-teal-600" : "text-gray-500"}`}
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
              className={`font-roboto-bold text-base ${!isLogin ? "text-teal-600" : "text-gray-500"}`}
            >
              Реєстрація
            </Text>
          </TouchableOpacity>
        </View>
        {!isLogin && (
          <View className="mt-6">
            <Text className="text-gray-500 text-sm font-roboto-bold">ІМЯ</Text>
            <TextInput
              placeholder="Ім'я"
              placeholderTextColor="#94a3b8"
              className="mt-2 h-14 px-4 bg-white rounded-xl border border-gray-200 text-base text-black"
            />
          </View>
        )}
        <View className="mt-6">
          <Text className="text-gray-500 text-sm font-roboto-bold">EMAIL</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            className="mt-2 h-14 px-4 bg-white rounded-xl border border-gray-200 text-base text-black"
            autoCapitalize="none"
          />
        </View>

        <View className="mt-4">
          <Text className="text-gray-500 text-sm font-roboto-bold">
            PASSWORD
          </Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            className="mt-2 h-14 px-4 bg-white rounded-xl border border-gray-200 text-base text-black"
          />
          {isLogin && (
            <TouchableOpacity>
              <Text className="text-teal-600 font-fraunces text-base mt-3 text-right">
                Забули пароль?
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity className="h-16 mt-8 justify-center items-center bg-teal-600 rounded-xl">
          <Text className="text-white text-xl font-roboto-bold">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-6 left-0 right-0 flex-row justify-center items-center gap-1">
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
    </View>
  );
}
