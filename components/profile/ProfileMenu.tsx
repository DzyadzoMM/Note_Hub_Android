import React from "react";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuProps {
  isBiometricEnabled: boolean;
  isBiometricSupported: boolean;
  onToggleBiometric: (value: boolean) => void;
}

export function ProfileMenu({
  isBiometricEnabled,
  isBiometricSupported,
  onToggleBiometric,
}: ProfileMenuProps) {
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
      {/* Звичайні пункти меню */}
      {menuItems.map((item, i) => (
        <TouchableOpacity
          key={item.label}
          className="w-full flex-row items-center px-5 py-4 gap-4"
          style={{
            borderBottomWidth: 1,
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

      {/* Пункт біометрії з перемикачем (відображається лише якщо пристрій її підтримує) */}
      {isBiometricSupported && (
        <View className="w-full flex-row items-center px-5 py-4 gap-4">
          <View
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: "#f0fdfa" }}
          >
            <Text style={{ color: "#14b8a6" }}>🛡</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[14.5px] font-semibold text-gray-900">
              Вхід за біометрією
            </Text>
            <Text className="text-[12px] text-gray-400">
              Використовувати відбиток пальця
            </Text>
          </View>
          <Switch
            value={isBiometricEnabled}
            onValueChange={onToggleBiometric}
            trackColor={{ false: "#d1d5db", true: "#14b8a6" }}
            thumbColor={"#ffffff"}
          />
        </View>
      )}
    </View>
  );
}
