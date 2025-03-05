import React from "react";
import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../styles/globalStyles";

interface FormInputProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  iconName,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
}) => {
  return (
    <View style={globalStyles.inputContainer}>
      <Text style={globalStyles.inputLabel}>{label}</Text>
      <View style={globalStyles.textInputContainer}>
        <Ionicons name={iconName} size={20} style={globalStyles.inputIcon} />
        <TextInput
          style={globalStyles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={label}
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
};

export default FormInput;
