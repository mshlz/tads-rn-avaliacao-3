import { useNavigation, useNavigationState } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import GateService from "../../services/GateService";

export function DebugScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Debug</Text>
      <Button
        text="Abrir"
        onPress={() => GateService.register("OPEN").then(() => alert("Abriu"))}
      />
      <Button
        text="Fechar"
        onPress={() => GateService.register("CLOSE").then(() => alert("Fechou"))}
      />
      <Button
        text="PRUNE"
        onPress={() => GateService.remove(true).then(() => alert("PRUNE"))}
      />
    </View>
  );
}
