
import { useNavigation, useNavigationState } from "@react-navigation/native"
import React from "react"
import { Text, View } from "react-native"

export function MateusScreen() {
  const navigation = useNavigation()
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mateus Game</Text>
    </View>
  )
}