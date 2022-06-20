
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Button } from "react-native"
import { Input } from "../components/Input"
import { auth } from '../firebase'

export function HomeScreen() {
  const navigation = useNavigation()

  const handle = () => {
    auth.createUserWithEmailAndPassword("test@gmail.com", "123123")
      .then(result => {
        console.log(result.user)
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Input />
      <Button onPress={() => handle()} title="Go back home" />
    </View>
  )
}