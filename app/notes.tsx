// app/notes.tsx
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CreateNoteModal } from "../components/CreateNoteModal";
import { NoteCard } from "../components/NoteCard";
import { NotesHeader } from "../components/NotesHeader";
import { TAG_TRANSLATIONS } from "../constants/notes";
import { useNotes } from "../hooks/useNotes";

export default function NotesScreen() {
  const router = useRouter();
  const {
    modalVisible,
    setModalVisible,
    isLoadingNotes,
    isRefreshing,
    notes,
    user,
    search,
    setSearch,
    activeTag,
    setActiveTag,
    onRefresh,
    handleCreateNote,
    handleDeleteNote,
  } = useNotes();

  const totalWords = notes.reduce(
    (acc, n) => acc + (n.content ? n.content.split(/\s+/).length : 0),
    0,
  );

  const safeNotes = Array.isArray(notes) ? notes : [];

  const filtered = safeNotes.filter((n) => {
    const matchesSearch =
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.content?.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === "All" || n.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  const existingTags = Array.from(
    new Set(safeNotes.map((n) => n.tag).filter(Boolean)),
  );
  const categories = [
    { label: "All", displayLabel: "Усі", count: safeNotes.length },
    ...existingTags.map((tag) => ({
      label: tag as string,
      displayLabel: TAG_TRANSLATIONS[tag as string] || tag,
      count: safeNotes.filter((n) => n.tag === tag).length,
    })),
  ];
  const displayCategories =
    safeNotes.length === 0
      ? [{ label: "All", displayLabel: "Усі", count: 0 }]
      : categories;

  return (
    <View className="flex-1" style={{ backgroundColor: "#f9fafb" }}>
      <Stack.Screen options={{ gestureEnabled: false, headerShown: false }} />

      <NotesHeader
        notesCount={safeNotes.length}
        totalWords={totalWords}
        user={user}
        search={search}
        onSearchChange={setSearch}
        onProfilePress={() => router.push("/profile")}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-none px-4 pt-4 pb-2"
      >
        <View className="flex-row gap-3">
          {displayCategories.map((chip) => {
            const isActive = activeTag === chip.label;
            return (
              <TouchableOpacity
                key={chip.label}
                onPress={() => setActiveTag(chip.label)}
                className="flex-row items-center gap-1.5 px-3.5 py-1.5 rounded-full"
                style={{
                  backgroundColor: isActive ? "#14b8a6" : "#fff",
                  borderWidth: isActive ? 0 : 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <Text
                  className="text-[12.5px] font-semibold"
                  style={{ color: isActive ? "#fff" : "#6b7280" }}
                >
                  {chip.displayLabel}
                </Text>
                <Text
                  className="text-[11px]"
                  style={{ color: isActive ? "#fff" : "#9ca3af", opacity: 0.8 }}
                >
                  {chip.count}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {isLoadingNotes && safeNotes.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#14b8a6" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 100,
            gap: 12,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="#14b8a6"
            />
          }
          renderItem={({ item }) => (
            <NoteCard item={item} onDelete={handleDeleteNote} />
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Text className="text-gray-400 text-base">
                Немає жодної нотатки
              </Text>
            </View>
          }
        />
      )}

      <View className="absolute bottom-6 right-5 z-20">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="w-14 h-14 rounded-2xl items-center justify-center text-white"
          style={{
            backgroundColor: "#14b8a6",
            shadowColor: "#14b8a6",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.45,
            shadowRadius: 28,
            elevation: 6,
          }}
        >
          <Text className="text-white text-3xl font-bold pb-1">+</Text>
        </TouchableOpacity>
      </View>

      <CreateNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateNote}
      />
    </View>
  );
}
