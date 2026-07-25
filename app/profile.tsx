import React from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileMenu } from "../components/profile/ProfileMenu";
import { ProfileStats } from "../components/profile/ProfileStats";
import { useProfile } from "../hooks/useProfile";

export default function ProfileScreen() {
  const { user, isLoading, isUploading, stats, handlePickImage, handleLogout } =
    useProfile();

  if (isLoading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "#f9fafb" }}
      >
        <ActivityIndicator size="large" color="#14b8a6" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: "#f9fafb" }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        user={user}
        isUploading={isUploading}
        onPickImage={handlePickImage}
      />

      <ProfileStats
        notesCount={stats.notesCount}
        totalWords={stats.totalWords}
        uniqueTagsCount={stats.uniqueTagsCount}
      />

      <ProfileMenu />

      <View
        className="mx-4 mt-4 rounded-2xl p-5 flex-row items-center justify-between"
        style={{ backgroundColor: "#0d9488" }}
      >
        <View>
          <Text className="text-white text-[14px] font-bold">
            Оновити до Pro
          </Text>
          <Text className="text-teal-100 text-[12px] mt-0.5">
            Необмежені нотатки та синхронізація
          </Text>
        </View>
        <TouchableOpacity
          className="px-4 py-2 rounded-xl"
          style={{ backgroundColor: "#fff" }}
          onPress={() => Alert.alert("Pro", "Скоро буде доступно!")}
        >
          <Text className="text-[13px] font-bold" style={{ color: "#0d9488" }}>
            Оновити
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mx-4 mt-4 mb-8">
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full flex-row items-center justify-center gap-2 py-3.5 rounded-2xl border"
          style={{ borderColor: "#fecaca" }}
        >
          <Text
            className="text-[14.5px] font-semibold"
            style={{ color: "#ef4444" }}
          >
            Вийти з аккаунта
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
