// components/profile/ProfileStats.tsx
import React from "react";
import { Text, View } from "react-native";

interface ProfileStatsProps {
  notesCount: number;
  totalWords: string;
  uniqueTagsCount: number;
}

export function ProfileStats({
  notesCount,
  totalWords,
  uniqueTagsCount,
}: ProfileStatsProps) {
  const stats = [
    { label: "Нотатки", value: notesCount },
    { label: "Слів", value: totalWords },
    { label: "Теги", value: uniqueTagsCount },
  ];

  return (
    <View
      className="mx-4 mt-4 rounded-2xl overflow-hidden border bg-white"
      style={{ borderColor: "#e5e7eb" }}
    >
      <View className="flex-row divide-x" style={{ borderColor: "#f3f4f6" }}>
        {stats.map((s) => (
          <View key={s.label} className="flex-1 items-center py-4">
            <Text
              className="text-[22px] font-bold"
              style={{ color: "#14b8a6" }}
            >
              {s.value}
            </Text>
            <Text className="text-[11.5px] mt-0.5 text-gray-400">
              {s.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
