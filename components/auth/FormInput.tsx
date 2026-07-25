// components/auth/FormInput.tsx
import { useField } from "formik";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface FormInputProps extends TextInputProps {
  name: string;
  label: string;
}

export function FormInput({ label, name, ...props }: FormInputProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <View className="mt-4">
      <Text className="text-gray-500 text-sm font-roboto-bold">{label}</Text>
      <TextInput
        placeholderTextColor="#94a3b8"
        className={`mt-2 h-14 px-4 bg-white rounded-xl border ${
          hasError ? "border-red-500" : "border-gray-200"
        } text-base text-black`}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        {...props}
      />
      {hasError && (
        <Text className="text-red-500 text-xs mt-1">{meta.error}</Text>
      )}
    </View>
  );
}
