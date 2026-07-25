// components/NoteCard.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TAG_TRANSLATIONS } from "../constants/notes";

interface NoteCardProps {
  item: any;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ item, onDelete }) => {
  return (
    <View
      className="w-full text-left rounded-2xl border p-4 flex flex-col gap-2"
      style={{
        borderColor: "#e5e7eb",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View className="flex-row items-start justify-between gap-2">
        <Text
          className="text-[15px] font-semibold leading-snug flex-1 text-gray-950"
          style={{ fontFamily: "var(--font-display)" }}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        {item.tag && (
          <View className="px-2 py-0.5 rounded-full bg-teal-50 flex-none">
            <Text className="text-[11px] font-semibold text-teal-700">
              {TAG_TRANSLATIONS[item.tag] || item.tag}
            </Text>
          </View>
        )}
      </View>

      <Text
        className="text-[13px] leading-relaxed text-gray-500"
        style={{ fontFamily: "var(--font-body)" }}
        numberOfLines={2}
      >
        {item.content}
      </Text>

      <View className="flex-row items-center justify-between mt-1">
        <Text className="text-[11.5px] text-gray-400">
          {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ""}
        </Text>

        <TouchableOpacity
          onPress={() => onDelete(item._id)}
          className="p-1 rounded-lg"
        >
          <Text className="text-red-400 font-bold text-base">🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
