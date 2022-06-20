
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, View } from "react-native"
import { auth } from '../firebase'

export function HomeScreen() {
  const navigation = useNavigation()

  const handle = () => {
    auth.signOut().then(console.log)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => handle()} title="Sign out" />
    </View>
  )
}