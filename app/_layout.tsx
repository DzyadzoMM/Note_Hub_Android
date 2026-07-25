// app/_layout.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Fraunces-Regular": require("../assets/fonts/Fraunces-Regular.ttf"),
    "Fraunces-Bold": require("../assets/fonts/Fraunces-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e8edf2",
        }}
      >
        <ActivityIndicator size="large" color="#14B8A6" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#e8edf2" }}
          edges={["top"]}
        >
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#e8edf2" },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="notes" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
