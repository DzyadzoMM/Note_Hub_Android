// components/CreateNoteModal.tsx
import { Formik } from "formik";
import React from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as Yup from "yup";
import { ALLOWED_TAGS, TAG_TRANSLATIONS } from "../constants/notes";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Введіть заголовок"),
  content: Yup.string().required("Введіть текст нотатки"),
  tag: Yup.string()
    .oneOf(ALLOWED_TAGS, "Оберіть один із дозволених тегів")
    .required("Оберіть тег"),
});

interface CreateNoteModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (
    values: { title: string; content: string; tag: string },
    actions: any,
  ) => void;
}

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6 h-[85%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-fraunces-bold text-2xl text-black">
              Створити нотатку
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 font-bold text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          <Formik
            initialValues={{ title: "", content: "", tag: ALLOWED_TAGS[0] }}
            validationSchema={NoteSchema}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
              >
                <View className="mt-2">
                  <Text className="text-gray-500 text-sm font-roboto-bold">
                    ЗАГОЛОВОК
                  </Text>
                  <TextInput
                    placeholder="Введіть заголовок"
                    placeholderTextColor="#94a3b8"
                    className={`mt-2 h-14 px-4 bg-gray-50 rounded-xl border ${
                      touched.title && errors.title
                        ? "border-red-500"
                        : "border-gray-200"
                    } text-base text-black`}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  {touched.title && errors.title && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.title}
                    </Text>
                  )}
                </View>

                <View className="mt-4">
                  <Text className="text-gray-500 text-sm font-roboto-bold">
                    ТЕКСТ НОТАТКИ
                  </Text>
                  <TextInput
                    placeholder="Введіть вміст..."
                    placeholderTextColor="#94a3b8"
                    multiline
                    numberOfLines={4}
                    className={`mt-2 p-4 bg-gray-50 rounded-xl border ${
                      touched.content && errors.content
                        ? "border-red-500"
                        : "border-gray-200"
                    } text-base text-black h-32 align-top`}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                  />
                  {touched.content && errors.content && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.content}
                    </Text>
                  )}
                </View>

                <View className="mt-4">
                  <Text className="text-gray-500 text-sm font-roboto-bold mb-2">
                    ОБЕРІТЬ ТЕГ
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {ALLOWED_TAGS.map((tag) => {
                      const isSelected = values.tag === tag;
                      return (
                        <TouchableOpacity
                          key={tag}
                          onPress={() => setFieldValue("tag", tag)}
                          className={`px-3 py-2 rounded-lg border ${
                            isSelected
                              ? "bg-teal-600 border-teal-600"
                              : "bg-gray-100 border-gray-200"
                          }`}
                        >
                          <Text
                            className={`text-xs font-roboto-bold ${
                              isSelected ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {TAG_TRANSLATIONS[tag] || tag}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {touched.tag && errors.tag && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.tag}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className={`h-16 mt-8 justify-center items-center bg-teal-600 rounded-xl ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                  onPress={() => !isSubmitting && handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text className="text-white text-xl font-roboto-bold">
                      Зберегти нотатку
                    </Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};
