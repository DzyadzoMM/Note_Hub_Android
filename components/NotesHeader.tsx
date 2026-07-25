// components/NotesHeader.tsx
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface NotesHeaderProps {
  notesCount: number;
  totalWords: number;
  user: any;
  search: string;
  onSearchChange: (text: string) => void;
  onProfilePress: () => void;
}

export const NotesHeader: React.FC<NotesHeaderProps> = ({
  notesCount,
  totalWords,
  user,
  search,
  onSearchChange,
  onProfilePress,
}) => {
  return (
    <View
      className="bg-white px-5 pt-3 pb-4 border-b"
      style={{ borderColor: "#f3f4f6" }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="text-[22px] font-bold text-gray-950 font-fraunces-bold">
            Мої нотатки
          </Text>
          <Text className="text-[12.5px] text-gray-400 font-fraunces">
            {notesCount} нотаток · {totalWords.toLocaleString()} слів
          </Text>
        </View>
        <TouchableOpacity
          onPress={onProfilePress}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500 flex-none"
        >
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-gray-200 justify-center items-center">
              <Text className="font-bold text-gray-600">
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View
        className="flex-row items-center rounded-xl gap-2.5 px-3.5"
        style={{ height: 42, backgroundColor: "#f3f4f6" }}
      >
        <Text className="text-gray-400">🔍</Text>
        <TextInput
          placeholder="Пошук нотаток…"
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={onSearchChange}
          className="flex-1 bg-transparent text-[14px] text-gray-950"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </View>
    </View>
  );
};
