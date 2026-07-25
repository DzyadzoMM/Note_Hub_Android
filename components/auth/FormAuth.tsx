// components/auth/FormAuth.tsx
import { Formik } from "formik";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { FormInput } from "./FormInput";

const AuthSchema = Yup.object().shape({
  email: Yup.string().email("Невірний формат email").required("Введіть email"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Введіть пароль"),
});

interface FormAuthProps {
  mode: "login" | "register";
  onSubmit: (values: any, actions: any) => void;
}

export function FormAuth({ mode, onSubmit }: FormAuthProps) {
  const isLogin = mode === "login";

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ handleSubmit, isSubmitting }) => (
        <View className="w-full">
          <FormInput
            label="EMAIL"
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <FormInput
            label="PASSWORD"
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          {isLogin && (
            <TouchableOpacity>
              <Text className="text-teal-600 font-fraunces text-base mt-3 text-right">
                Забули пароль?
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className={`h-16 mt-8 justify-center items-center bg-teal-600 rounded-xl ${
              isSubmitting ? "opacity-50" : ""
            }`}
            onPress={() => !isSubmitting && handleSubmit()}
            disabled={isSubmitting}
          >
            <Text className="text-white text-xl font-roboto-bold">
              {isSubmitting
                ? "Завантаження..."
                : isLogin
                  ? "Увійти"
                  : "Зареєструватися"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
