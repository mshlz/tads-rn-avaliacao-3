import { useNavigation } from '@react-navigation/core'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from "react"
import 'react-native-gesture-handler'
import { useAuthentication } from './src/hooks/useAuthentication'
import { LoginScreen } from './src/screens/auth/LoginScreen'
import { RegisterScreen } from './src/screens/auth/RegisterScreen'
import { HomeScreen } from './src/screens/HomeScreen'

const Stack = createStackNavigator();
const AuthNavigator = (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
)

const Drawer = createDrawerNavigator()
const AppNavigator = (
  <Drawer.Navigator initialRouteName="Login">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Home@" component={HomeScreen} />
    {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
  </Drawer.Navigator>
)

export default function App() {
  const { user } = useAuthentication()

  return (
    <NavigationContainer>
      {user ? AppNavigator : AuthNavigator}
    </NavigationContainer>
  )
}
