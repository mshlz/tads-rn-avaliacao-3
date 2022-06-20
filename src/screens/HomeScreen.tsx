
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button } from "react-native";
import { Input } from "../components/Input";

export function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Input />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}