// components/profile/ProfileMenu.tsx
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export function ProfileMenu() {
  const menuItems = [
    { label: "Редагувати профіль", sub: "Ім'я, email, пароль" },
    { label: "Безпека", sub: "Двофакторна автентифікація" },
    { label: "Експорт нотаток", sub: "Markdown або PDF" },
  ];

  return (
    <View
      className="mx-4 mt-4 rounded-2xl overflow-hidden border bg-white"
      style={{ borderColor: "#e5e7eb" }}
    >
      {menuItems.map((item, i) => (
        <TouchableOpacity
          key={item.label}
          className="w-full flex-row items-center px-5 py-4 gap-4"
          style={{
            borderBottomWidth: i < menuItems.length - 1 ? 1 : 0,
            borderBottomColor: "#f3f4f6",
          }}
          onPress={() =>
            Alert.alert("У розробці", `Розділ "${item.label}" скоро з'явиться`)
          }
        >
          <View
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: "#f0fdfa" }}
          >
            <Text style={{ color: "#14b8a6" }}>⚙</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[14.5px] font-semibold text-gray-900">
              {item.label}
            </Text>
            <Text className="text-[12px] text-gray-400">{item.sub}</Text>
          </View>
          <Text className="text-gray-300 font-bold">›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
