// src/services/biometricService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

export const biometricService = {
  async checkSupport(): Promise<{ isAvailable: boolean; type?: string }> {
    try {
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();
      return { isAvailable: available, type: biometryType };
    } catch (error) {
      console.error("Error checking biometric support:", error);
      return { isAvailable: false };
    }
  },

  async enable(email: string, password: string): Promise<boolean> {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) return false;

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: "Підтвердіть особу для увімкнення біометрії",
      });

      if (success) {
        await AsyncStorage.setItem("biometric_email", email);
        await AsyncStorage.setItem("biometric_password", password);
        await AsyncStorage.setItem("is_biometric_enabled", "true");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error enabling biometrics:", error);
      return false;
    }
  },

  async login(
    apiLoginFunction: (email: string, password: string) => Promise<void>,
  ): Promise<void> {
    try {
      const isEnabled = await AsyncStorage.getItem("is_biometric_enabled");
      if (isEnabled !== "true") return;

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: "Увійдіть за допомогою відбитка пальця",
      });

      if (success) {
        const email = await AsyncStorage.getItem("biometric_email");
        const password = await AsyncStorage.getItem("biometric_password");

        if (email && password) {
          await apiLoginFunction(email, password);
        }
      }
    } catch (e) {
      console.error("Biometric login error:", e);
    }
  },
};
