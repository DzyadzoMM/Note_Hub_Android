import React from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ProfileHeaderProps {
  user: any;
  isUploading: boolean;
  onPickImage: () => void;
}

export function ProfileHeader({
  user,
  isUploading,
  onPickImage,
}: ProfileHeaderProps) {
  return (
    <View
      className="bg-white px-5 pt-12 pb-7 items-center border-b"
      style={{ borderColor: "#f3f4f6" }}
    >
      <TouchableOpacity
        onPress={onPickImage}
        disabled={isUploading}
        className="relative mb-4"
      >
        <View
          className="w-24 h-24 rounded-full overflow-hidden border-4"
          style={{ borderColor: "#14b8a6" }}
        >
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className="w-full h-full object-cover"
            />
          ) : (
            <View className="w-full h-full bg-gray-200 justify-center items-center">
              <Text className="text-gray-500 font-bold text-3xl">
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
          )}
        </View>

        {isUploading && (
          <View className="absolute inset-0 bg-black/40 rounded-full justify-center items-center">
            <ActivityIndicator color="#ffffff" />
          </View>
        )}

        <View
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full items-center justify-center border-2 border-white"
          style={{ backgroundColor: "#14b8a6" }}
        >
          <Text className="text-white text-xs font-bold">✎</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPickImage}>
        <Text
          className="text-[12.5px] font-semibold mb-1"
          style={{ color: "#14b8a6" }}
        >
          Змінити аватар
        </Text>
      </TouchableOpacity>

      <Text className="text-[20px] font-bold mt-3 text-gray-900">
        {user?.username || "Користувач"}
      </Text>
      <Text className="text-[13.5px] text-gray-500">{user?.email}</Text>
      <View
        className="mt-2 px-3 py-0.5 rounded-full"
        style={{ backgroundColor: "#f0fdfa" }}
      >
        <Text
          className="text-[11.5px] font-semibold"
          style={{ color: "#0d9488" }}
        >
          Безкоштовний план
        </Text>
      </View>
    </View>
  );
}
