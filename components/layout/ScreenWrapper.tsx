import React, { ReactNode } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

interface Props {
  children: ReactNode;
}

const ScreenWrapper = ({ children }: Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    flexGrow: 1,
  },
});

export default ScreenWrapper;
